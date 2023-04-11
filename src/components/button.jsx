import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';

import { AppStateContext, AuthentificationContext } from '../context.jsx';

import './button.css';

const Button = (props) => {

	let classes = (props.buttonClassName ? props.buttonClassName + ' ' : '') + 'button ';
	classes += (props.type === 'important' ? 'button--important' : 'button--regular');

	if (props.icon){
		return (
			<button className='button'
					disabled={props.disabled}
					onClick={props.handleClick}
			>
				<span className='button__icon'>{props.icon}</span>
				{props.text}
			</button>
		)
	}
	return (
		<input
			icon={props.icon}
			disabled={props.disabled}
			onClick={props.handleClick}
			type='button'
			className={classes}
			value={props.text} />
	);

}

const ButtonIcon = (props) => {
	const classes = 'button-icon ' + props.classes;
	return (
		<input
			type='button'
			onClick={props.handleClick}
			className={classes}
			value={props.icon ? props.icon : 'delete'} />
	);
}

const ButtonPrivate = (props) => {
	const isAuthentificated = useContext(AuthentificationContext).isUserAuthentificated;
	return (
		isAuthentificated ?
			<Button
				disabled={props.disabled}
				type={props.type}
				text={props.text}
				handleClick={props.handleClick}
				buttonClassName={props.buttonClassName}
			/>
			: null
	);
}

const ButtonAskingConfirmation = (props) => {

	const [isFirstStep, setIsFirstStep] = useState(true);

	const askForConfirmation = (e) => {
		e.stopPropagation();
		setIsFirstStep(false);
	}

	const cancelAction = () => {
		setIsFirstStep(true);
	}

	const FirstStepButton = () => {
		return (
			<ButtonPrivate
				type='important'
				buttonClassName='button-step--xxlarge'
				text={props.text}
				handleClick={askForConfirmation} />	
		);
	}

	const SecondStepButton = () => {
		return (<>
			<ButtonPrivate
				buttonClassName='button--frozen button-step--xxlarge'
				type='important'
				disabled={true}
				text={props.text} />
			<div className='button-step__second-part'>
				<span className={'button-step__question--' + props.background }>Sure ?</span>
				<ButtonPrivate buttonClassName='button-step--small' type='important' text='yes' handleClick={props.confirmedAction} />
				<ButtonPrivate buttonClassName='button-step--small' type='important' text='no' handleClick={cancelAction} />
			</div>
		</>)
	}

	return (
		isFirstStep ?
			<FirstStepButton />
			:
			<SecondStepButton />
	);

}

const ButtonRestart = (props) => {
	const {isAppListening, setIsAppListening} = useContext(AppStateContext);

	const restart = () => {
		if (props.handleClick)
			props.handleClick();

		fetch(window.BASE + '/api/app/state.json', {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({isListening: false, currentConfiguration: "", startedAt: 0})
		})
		.then((response) => response.json())
		.then((result) => {

			fetch(window.BASE + '/api/configurations/last')
			.then((response) => response.json())
			.then((result) => {

				const dateID = Date.now()
				const configuration = result.id + '.json';

				fetch(window.BASE + '/api/app/state.json', {
					method: 'PUT',
					credentials: 'include',
					body: JSON.stringify({isListening: true, currentConfiguration: configuration, startedAt: dateID})
				})
				.then((response) => response.json())
				.then((result) => {
					if (!result.hasOwnProperty('error')){
						setIsAppListening(true);
					}
				})
			})

		})
	}

	return (
		isAppListening ?
			<ButtonAskingConfirmation
				text='Restart'
				confirmedAction={restart}
				background={props.lightBackground ? 'light' : 'dark' }
			/>
		:
		null
	);
}

const ButtonStopListening = (props) => {

	const {isAppListening, setIsAppListening} = useContext(AppStateContext);

	const stopListening = () => {

		if (props.handleClick)
			props.handleClick();

		fetch(window.BASE + '/api/app/state.json', {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({isListening: false, currentConfiguration: "", startedAt: 0})
		})
		.then((response) => response.json())
		.then((result) => {
			setIsAppListening(false);
		})

	}

	return (
		isAppListening ?
			<ButtonAskingConfirmation
				text='Stop listening'
				confirmedAction={stopListening}
				background={props.lightBackground ? 'light' : 'dark' }
			/>
		:
			null
	);
}

const LinkPrivate = (props) => {
	const isAuthentificated = useContext(AuthentificationContext).isUserAuthentificated;

	return (
		isAuthentificated ? <Link to={props.to} type={props.type} className={'button button--important'}>{props.text}</Link> : null
	);
}

export {
	Button,
	ButtonPrivate,
	ButtonStopListening,
	ButtonRestart,
	ButtonIcon,
	LinkPrivate,
	ButtonAskingConfirmation
};