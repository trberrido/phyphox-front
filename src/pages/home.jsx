/*
	If an experiment is currently running :
		displays it
	else
		displays last one
*/

import React, { useContext } from 'react';

import { AppStateContext } from '../context.jsx';
import Experiment from '../components/experiment.jsx';

const PageHome = () => {

	const isAppListening = useContext(AppStateContext).isAppListening;
	return(<>
		<Experiment
			title={isAppListening === true ? 'Ongoing experience, data collection in progress' : 'Last experiment'}
			isOnGoingExperiment={isAppListening}
			fetchURL={window.API + '/api/experiments/' + (isAppListening === true ? 'current' : 'last')} />
	</>);

}

export default PageHome;