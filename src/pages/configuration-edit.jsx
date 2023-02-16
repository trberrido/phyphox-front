import React from 'react';
import { Link } from 'react-router-dom';

import {Title} from '../components/title.jsx';
import ConfigurationForm from '../components/configuration-form/configuration-form.jsx';

const ConfigurationEditionPage = () => {

	return (<>

		<Title
		header='Edit an experience'
		content='Edit this configuration'/>

		<Link className='configuration__link' to='/administration'>← Back to administration.</Link>
	
		<ConfigurationForm method='PUT' />
	</>)
}

export default ConfigurationEditionPage;