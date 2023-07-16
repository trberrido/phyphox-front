import React, { useContext } from 'react';

import {Title} from '../components/title.jsx';
import Spacer from '../components/spacer.jsx';
import List from '../components/list.jsx';
import { ButtonStopListening, LinkPrivate } from '../components/button.jsx';
import { AppStateContext } from '../context.jsx';

const PageAdministration = () => {
	const isAppListening = useContext(AppStateContext).isAppListening;
	return (
		<>
			<Title
				header='Hello Admin, what do you want to do ?'
				content='Management space'/>

			<Spacer size='small' />

			<p>Current state : the application is {isAppListening ? 'on 🐵' : 'off 🙈'}.</p>

			{isAppListening ?
				<ButtonStopListening /> :
				<LinkPrivate replace to='/administration/create_configuration' type='important' text='Create new configuration'/>
			}

			<Spacer />

			<h2>Create a visualization from a past configuration :</h2>

			<List
				collection='configurations'
				actionName='Edit'
				actionURL='/administration/edit_configuration/'
				optionRunnable={true}
				optionDuplicate={true}
			/>
		</>
	);
};

export default PageAdministration;