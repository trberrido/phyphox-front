/*

	<Experiment
		<Visualisations : [
			{
					
					SingleNumber || Histogram || Graph
					AxisX, AxisY
					Background
					VisualizationFooter
			}
			...
		] />
	/>


*/

import { useContext, useEffect, useState } from 'react';

import Visualization from './visualizations/visualization.jsx';
import {Title} from '../components/title.jsx';
import Loader from '../components/loader';
import Message from '../components/message.jsx';
import { AppStateContext } from '../context.jsx';

import loadingGIF from '../images/loading.gif';

const Experiment = (props) => {

	const [experiment, setExperiment] = useState({
		isLoaded: false,
		error: false,
		data: null
	});

	const setIsAppListening = useContext(AppStateContext).setIsAppListening;

	useEffect(() => {

		if (!props.isOnGoingExperiment && experiment.isLoaded)
			return ;

		const fetchExperiment = (fetchURL) => {
			fetch(fetchURL, {credentials: 'include'})
			.then(response => response.json())
			.then(
				(result) => {
					if (result.hasOwnProperty('error')){
						setExperiment ({...experiment,
							isLoaded: true,
							error: result.error
						})
					} else {
						if (result === 'closing')
							setIsAppListening(false);
						else {
							setExperiment({
								isLoaded: true,
								error: false,
								data: result
							})
						}
					}

				},
				(error) => {
					setExperiment ({...experiment,
						isLoaded: true,
						error: String(error)
					})
				}
			);
		}

		if (props.isOnGoingExperiment){
			const interval = setInterval(
				fetchExperiment,
				1000,
				props.fetchURL
			);
			return () => { clearInterval(interval) }
		} else {
			fetchExperiment(props.fetchURL);
		}

	}, [experiment, props, setIsAppListening]);

	if (!experiment.isLoaded)
		return <Loader />

	if (experiment.error)
		return <Message type='error' message={experiment.error} />

	return (<>
		<Title
			header={props.title}
			content={experiment.data.title}
			icon={props.isOnGoingExperiment ? false : 'square_foot'}
			image={props.isOnGoingExperiment ? loadingGIF : false}
			/>
		<p className='experiment__description'>{experiment.data.description}</p>
		{
			experiment.data.visualizations.map((visualization, index) => (
				<Visualization
					index={index}
					url={props.fetchURL}
					isOnGoingExperiment={props.isOnGoingExperiment}
					key={visualization.title + '_' + index.toString()}
					data={visualization} />
			))
		}
	</>);
};

export default Experiment;