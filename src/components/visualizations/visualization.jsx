import { useState, useRef, useEffect, useMemo } from 'react';

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
		bottom: 75,
		left: 175
	}
	const colors = {
		text: '#ADADAD',
		background: '#1B1A1A',
		stick: '#ADADAD47'
	}
	const visualization = props.data;
	const [isFullscreen, setIsFullscreen] = useState(false);
	const ref = useRef(null);
	const domain = {
		x : {
			min: visualization.xmin !== 'undefined' && !isNaN(parseFloat(visualization.xmin)) ? parseFloat(visualization.xmin) : false,
			max: visualization.xmax !== 'undefined' && !isNaN(parseFloat(visualization.xmax)) ? parseFloat(visualization.xmax) : false
		},
		y: {
			min: visualization.ymin !== 'undefined' && !isNaN(parseFloat(visualization.ymin)) ? parseFloat(visualization.ymin) : false,
			max: visualization.ymax !== 'undefined' && !isNaN(parseFloat(visualization.ymax)) ? parseFloat(visualization.ymax) : false
		}
	}
	const [dimensions, setDimensions] = useState({width: 0, height: window.innerHeight * (isFullscreen ? .9 : .7)});

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
						height: window.innerHeight * (isFullscreen ? .9 : .7)
					});
				}
			}
		);
		resizeObs.observe(refWrapper);
		return () => resizeObs.unobserve(refWrapper)

	}, [dimensions, isFullscreen, ref])

	const filteredData = useMemo(() => {

		if (visualization.displayedData.length === 0)
			return visualization.displayedData;

		if (domain.x.min === false && domain.x.max === false
			&& domain.y.min === false && domain.y.max === false)
			return visualization.displayedData;

		if (visualization.type === 'Histogram'){

			const isInDomain = (item) => {
				if ((domain.x.min === false || item >= domain.x.min)
					&& (domain.x.max === false || item <= domain.x.max)){
						return true
					}
				return false;
			}
			return visualization.displayedData.filter(isInDomain)
		}

		if (visualization.type === 'Graph'){

			const filterItem = (item) => {

				const newItem = {
					x: [],
					y: []
				};
				item.x.forEach((value, index) => {

					if (((domain.x.min === false || value >= domain.x.min)
						&& (domain.x.max === false || value <= domain.x.max))
						&&
						((domain.y.min === false || item.y[index] >= domain.y.min)
						&& (domain.y.max === false || item.y[index] <= domain.y.max))
					){
						newItem.x.push(value)
						newItem.y.push(item.y[index])
					}

				})
				return newItem;

			}

			let filteredMeasures = [];
			visualization.displayedData.measures.forEach((item) => {

				const newItem = filterItem(item);

				if (newItem.x.length)
					filteredMeasures.push(newItem)

			});

			let filteredFits = {};
			Object.entries(visualization.displayedData.fits).forEach(([key, value]) => {
				const newItem = filterItem(value);
				if (newItem.x.length)
					filteredFits[key] = newItem;
			})

			if (!filteredMeasures.length && !Object.keys(filteredFits).length){
				return [];
			}

			return {
				measures: filteredMeasures,
				fits: filteredFits
			}
		}

		return visualization.displayedData;

	}, [visualization.displayedData, domain, visualization.type]);

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
							(dimensions.width === 0 || filteredData.length === 0)  ?
								<WaitingData isOnGoingExperiment={props.isOnGoingExperiment} />
							:
								{

									'Single Number':<VisualizationSingleNumber
														unit={visualization.unit}
														data={filteredData}
														isOnGoingExperiment={props.isOnGoingExperiment}	/>,

									'Histogram': 	<VisualizationHistogram
														dimensions={dimensions}
														domain={domain}
														colors={colors}
														axisLabel={{x: visualization.labelx, y: visualization.labely}}
														data={filteredData}
														margins={margins} />,

									'Graph':  		<VisualizationGraph
														dimensions={dimensions}
														isOnGoingExperiment={props.isOnGoingExperiment}
														colors={colors}
														domain={domain}
														axisLabel={{x: visualization.labelx, y: visualization.labely}}
														data={filteredData}
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