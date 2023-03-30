/*
	The login process is made in two steps :
		> email (POST if user doesn't exist, PUT if so)
		> password (PUT)
*/

import React, { useState, useContext } from "react";
import { useNavigate, Navigate, useLoaderData } from "react-router-dom";

import {Title} from '../components/title.jsx';
import Loader from '../components/loader.jsx';
import { LabeledInput, Submit } from '../components/form.jsx';
import Message from '../components/message.jsx';
import { AuthentificationContext } from '../context.jsx';

import '../components/form.css';

const PageLogin = () => {
	
	const {isUserAuthentificated, setIsUserAuthentificated} = useContext(AuthentificationContext);
	let navigate = useNavigate();

	const [credentials, setCredentials] = useState({});

	const [formState, setFormState] = useState({
		isDisabled: false,
		error: false,
		step: 'email',
		doesUserExist: useLoaderData()
	});
	
	const handleInputChange = (e) => {
		setCredentials({...credentials, [e.target.name]: e.target.value});
	}

	const resendPassword = (e) => {
		e.preventDefault();
		setFormState({...formState, step: 'email'});
	}

	function handleSubmit(e){
		
		e.preventDefault();
		setFormState({...formState, isDisabled: true});

		fetch(window.BASE + '/api/user/',
			{
				headers: {'Content-Type': 'application/json'},
				method: (formState.doesUserExist ? 'PUT' : 'POST'),
				credentials: 'include',
				body: JSON.stringify(credentials)
			}
		)
		.then((response) => response.json())
		.then((result) => {

				if (result.hasOwnProperty('error')){

					setFormState({...formState, isDisabled: false, error: result.error})

				} else {

					if (formState.step === 'email'){
						
						setFormState({
							...formState,
							error: false,
							step: 'password',
							isDisabled: false
						});
						
					} else {
						setIsUserAuthentificated(true);
						navigate('/administration', { replace: true });
					}
				}

			},
			(error) => {
				setFormState({...formState, error: error, isDisabled: false});
			}
		)

	}

	if (isUserAuthentificated === null){
		return <Loader />;
	}

	if (isUserAuthentificated){
		return <Navigate to="/administration" replace />;
	}

	return (
		<>

			<Title header='Adminstration' content={formState.doesUserExist ? 'Log in to your account' : 'Create a new user'}/>
		
			{formState.error && <Message type='error' message={formState.error} />}
			
			<form id='form' className='form' onSubmit={handleSubmit}>
				{(formState.step === 'email') ?

					<LabeledInput
						id='email'
						modificationCSS='regular form__label--small'
						icon='mail'
						isHidden={false}
						readOnly={false}
						placeholder='Email'
						value={(credentials.email ? credentials.email : '')}
						handleChange={handleInputChange}
						type='email'
						required={true}
					/>
				:
					<>
					
						{ !formState.error && <Message message='A code has been sent you by email.' /> }
						<LabeledInput
							id='password'
							icon='key'
							modificationCSS='regular form__label--small'
							placeholder='Received password'
							value={(credentials.password ? credentials.password : '')}
							handleChange={handleInputChange}
							type='password'
							required={true}	/>
								
						<input type='button' className='form__button--reset' onClick={resendPassword} value='Send a new password' /><br />
					</>

				}
				<Submit text={formState.doesUserExist ? 'Authentificate' : 'Create new user'} disabled={formState.isDisabled} />
			</form>
			
		</>
	);
};

export default PageLogin;