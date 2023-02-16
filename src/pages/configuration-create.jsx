import React from 'react';
import { Link } from 'react-router-dom';

import {Title} from '../components/title.jsx';
import ConfigurationForm from '../components/configuration-form/configuration-form.jsx';

const ConfigurationCreationPage = () => {

	return (<>

		<Title
		header='Set up a new experience'
		content='Create a project'/>

		<Link className='configuration__link' to='/administration'>← Back to administration.</Link>

		<ConfigurationForm method='POST' />
	</>)
}

export default ConfigurationCreationPage;