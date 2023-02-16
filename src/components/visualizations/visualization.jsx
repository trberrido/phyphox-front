import { useState, useRef, useEffect } from 'react';

import VisualizationSingleNumber from "./singleNumber";
import VisualizationHistogram from "./histogram";
import VisualizationGraph from "./graph";

import Message from '../message.jsx';
import Loader from '../loader.jsx';

import './visualization.css';
import { ButtonIcon } from '../button';

const WaitingData = (props) => {
		
	if (props.isOnGoingExperiment)
		return <Loader />
	else 
		return <Message message='No data to display.' />
	
}

const VisualizationFooter = (props) => {

	const url = props.url + '/visualizations/' + props.index;

	return (
		<div className='visualization__footer'>
			<div className='visualization-footer__item-left'>
				<input
					className='visualization-footer__item visualization-footer__button-fullscreen'
					onClick={props.handleClick}
					value={props.isFullscreen ? 'zoom_in_map' : 'zoom_out_map'}
					type='button' />
			</div>
			{
				!props.isOnGoingExperiment ?
					<a
						href={url}
						target='_blank'
						rel='noreferrer'
						className='visualization-footer__item visualization-footer__dl'
					>
						<span className='visualization-footer__dl-icon'>download</span>Download data (.json)
					</a>
				:
					null
			}
		</div>
	)

}

const Visualization = (props) => {
	
	const margins = {
		top: 10,
		right: 50,
		bottom: 50,
		left: 75
	}
	const colors = {
		text: '#ADADAD',
		background: '#1B1A1A',
		stick: '#ADADAD47'
	}
	const visualization = props.data;

	const [isFullscreen, setIsFullscreen] = useState(false); 
	const ref = useRef(null);

	const [dimensions, setDimensions] = useState({width: 0, height: window.innerHeight * (isFullscreen ? .8 : .5)});

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	}

	

	useEffect(() => {

		const captureEscape = (e) => {
			if (e.key === 'Escape')
				toggleFullscreen()
		}
		
		if (isFullscreen)
			window.addEventListener('keyup', captureEscape);

		return () => { window.removeEventListener('keyup', captureEscape) }

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFullscreen])

	useEffect(() => {

		const refWrapper = ref.current;
		const resizeObs = new ResizeObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.contentRect.width !== dimensions.width){
					setDimensions({
						width: entry.contentRect.width,
						height: window.innerHeight * (isFullscreen ? .7 : .5)
					});
				}
			}
		);
		resizeObs.observe(refWrapper);
		return () => resizeObs.unobserve(refWrapper)
		
	}, [dimensions, isFullscreen, ref])

	return (

		<article className={'visualization' + (isFullscreen ? ' visualization--fullscreen' : '')} >
		
			<div className='visualization__frame'>

				{
					isFullscreen ? 
						<ButtonIcon
							handleClick={toggleFullscreen}
							classes={'visualization__close-button'}
							icon='close'
							/>
					: null
				}

				<div className='visualization__inner-padding'>
					
					<div className='visualization__header'>
						<h2 className='visualization__title'>{visualization.title}</h2>
						<p className='visualization__participants-number'>
							<span>{visualization.contributions_total ? visualization.contributions_total : 0}</span>
							<span className='visualization__participants-icon'>group</span>
						</p>
					</div>

					<div className='visualization__wrapper' ref={ref} >
						{
							(dimensions.width === 0 || visualization.displayedData.length === 0)  ?
								<WaitingData isOnGoingExperiment={props.isOnGoingExperiment} />
							:		
								{

									'Single Number':<VisualizationSingleNumber
														unit={visualization.unit}
														data={visualization.displayedData}
														isOnGoingExperiment={props.isOnGoingExperiment}	/>,

									'Histogram': 	<VisualizationHistogram
														dimensions={dimensions}
														colors={colors}
														axisLabel={{x: visualization.labelx, y: visualization.labely}}
														data={visualization.displayedData}
														margins={margins} />,

									'Graph':  		<VisualizationGraph
														dimensions={dimensions}
														colors={colors}
														axisLabel={{x: visualization.labelx, y: visualization.labely}}
														data={visualization.displayedData}
														lines={visualization.lines}
														margins={margins} />
								}[visualization.type]		
						}

						
					</div>
					
				</div>

				{
					visualization.description ?
						<p className='visualization__description'>{visualization.description}</p>
					:
						null
				}

			</div>
			<VisualizationFooter
				isFullscreen={isFullscreen}
				handleClick={toggleFullscreen}
				isOnGoingExperiment={props.isOnGoingExperiment}
				index={props.index}
				url={props.url} />
		</article>

	);
}

export default Visualization;