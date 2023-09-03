import { useParams } from 'react-router-dom';

import Experiment from '../components/experiment.jsx';

const PageExperiment = () => {
	const request = useParams();
	return(<>
		<Experiment
			title={request.experimentID}
			isOnGoingExperiment={false}
			fetchURL={window.API + '/api/experiments/' + request.experimentID + '.json'} />
	</>);
}

export default PageExperiment;