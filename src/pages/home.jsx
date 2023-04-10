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
			title={isAppListening ? 'Ongoing experience, data collection in progress' : 'Last experiment'}
			isOnGoingExperiment={isAppListening}
			fetchURL={window.BASE + '/api/experiments/' + (isAppListening ? 'current' : 'last')} />
	</>);

}

export default PageHome;