import React, { useContext } from 'react';

import './title.css';

import { AppStateContext } from '../context.jsx';

const TitleLight = (props) => {
	// made for 404 error page, unable to get context
	return (
		<div className='title'>
			<p className='title__header'>
				{ props.header }
				{
					props.icon ? 
					<span className='title__icon'>
						{props.icon}
					</span>
					: null
				}
				{
					props.image ?
					<img className='title__image' alt='' src={props.image} />
					: null
				}
			</p>
			<h1 className='title__content'>{ props.content }</h1>
		</div>
	);
}

const Title = (props) => {

	const isAppListening = useContext(AppStateContext).isAppListening;

	document.title = (isAppListening ? '🟩' : '🟧') + ' phyphox, ' + props.content;
	
	return (
		<TitleLight
			header={props.header}
			content={props.content}
			image={props.image}
			icon={props.icon} />
	)
	
}

export {Title, TitleLight};