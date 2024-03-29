import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Message from './message.jsx';
import Loader from './loader.jsx';

import { AuthentificationContext, AppStateContext } from '../context.jsx';

import './list.css';

const ListItem = (props) => {
	const isAuthentificated = useContext(AuthentificationContext).isUserAuthentificated;

	const [isDisabled, setIsDisabled] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		props.deleteItem(e);
		setIsDisabled(true);
	}

	return (
		<li
			className={'file-list__item' + (isDisabled ? ' file-list__item--deleting' : '')}
			data-filename={props.item.filename}
		>
			<span>{props.item.title}</span><br />

			<Link
				className={'file-list__link' + (isDisabled ? ' file-list__link--disabled' : '')}
				aria-disabled={isDisabled}
				to={props.actionURL + props.item.id}
			>
				{props.actionName}
			</Link>

			{
				props.isRunnable ?
				<a
					onClick={props.isRunnable}
					data-filename={props.item.filename}
					className={'file-list__link' + (isDisabled ? ' file-list__link--disabled' : '')}
					href={window.API + '/api/' + props.collection + '/' + props.item.filename }
				>
					Run
				</a>
				: null
			}

			{props.isDuplicable ?
				<a
					className={'file-list__link' + (isDisabled ? ' file-list__link--disabled' : '')}
					onClick={props.isDuplicable}
					href={window.API + '/api/' + props.collection + '/' + props.item.filename }
				>
					Duplicate
				</a>
				: null }

			{props.isDownloadable ?
				<a
					className={'file-list__link' + (isDisabled ? ' file-list__link--disabled' : '')}
					href={props.downloadURL}
					target='_blank' rel='noreferrer'
					aria-disabled={isDisabled}
					download >
					download (json file, {Math.round(props.item.filesize / 1024)} KB)
				</a>
				: null }

			{isAuthentificated ?
				<a
					className={'file-list__link' + (isDisabled ? ' file-list__link--disabled' : '')}
					target='_blank' rel='noreferrer'
					onClick={handleClick}
					href={window.API + '/api/' + props.collection + '/' + props.item.filename}>
						delete
					</a>
				: null}
		</li>
	);

}

function List(props) {

	const navigate = useNavigate();
	const setIsAppListening = useContext(AppStateContext).setIsAppListening;

	const [list, setList] = useState({
		error: null,
		isLoaded: false,
		items: []
	});

	const run = (e) => {

		e.preventDefault();
		const dateID = Date.now()
		const configuration = e.currentTarget.dataset.filename;
		fetch(window.API + '/api/app/state.json', {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({isListening: true, currentConfiguration: configuration, startedAt: dateID})
		})
		.then((response) => response.json())
		.then((result) => {
			if (!result.hasOwnProperty('error')){
				setIsAppListening(true);
				navigate('/')
			} else {
				setList({...list, error: result.error})
			}
		})

	}

	const duplicateItem = (e) => {

		e.preventDefault();
		const URL = e.currentTarget.href;
		fetch(URL,
			{
				credentials : 'include',
				method: 'POST'
			})
			.then((response) => response.json())
			.then((result) => {
				if (!result.hasOwnProperty('error')){
					const newItemsList = structuredClone(list.items);
					newItemsList.unshift(result)
					setList({...list, items: newItemsList});
				} else {
					setList({...list, error: result.error})
				}
			})

	}

	const deleteItem = (e) => {

		const deleteURL = e.currentTarget.href;
		const item = e.currentTarget.closest('.file-list__item');

		fetch(deleteURL, {credentials: 'include', method: 'DELETE'})
			.then(response => response.json())
			.then((result) => {
				if (!result.hasOwnProperty('error')){
					const copy = [...list.items];
					setList({...list, items: copy.filter(listItem => listItem.filename !== item.dataset.filename)});
				}
			})

	}

	useEffect(() => {
		if (!list.isLoaded){
			fetch(window.API + '/api/' + props.collection, {method: 'GET'})
			.then (res => res.json())
			.then (
				(result) => {
					if (result.hasOwnProperty('error')){
						setList({...list, error: result.error, isLoaded: true})
					} else {
						setList({...list, items: result, isLoaded: true})
					}
				},
				(error) => {
					setList({...list, isLoaded: true, error: error})
				}
			)
		}
	}, [props.collection, list]);

	if (list.error){
		return <Message type='error' message={list.error} />;
	} else if (!list.isLoaded){
		return <Loader />;
	} else {
		if (list.items.length) {
			return (
				<ul className='file-list'>
					{list.items.map(item => (
						<ListItem
							isDownloadable={props.isDownloadable}
							isDuplicable={props.optionDuplicate ? duplicateItem : false}
							isRunnable={props.optionRunnable ? run : false}
							downloadURL={window.API + '/api/' + props.collection + '/' + item.filename}
							key={item.id}
							item={item}
							collection={props.collection}
							actionName={props.actionName}
							actionURL={props.actionURL}
							deleteItem={deleteItem}
							/>
					))}
				</ul>
			);
		} else {
			return (<p>Nothing yet.</p>);
		}
	}
}

export default List;