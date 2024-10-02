import { useEffect, useMemo, useRef, useState } from 'react';

import * as d3 from "d3";

import Background from "./background";
import { AxisX, AxisY } from "./axis";

const Legendes = (props) => {
	return (<div className='graph-legendes__wrapper'>
		{
			props.data.map((element, index) => {
				if (element.idline){
					return (

						<div
							className='graph-legende'
							key={element.idline + '_' + index.toString()}>
							<div style={{background:element.colorline}} className='graph-legende__colorsquare'></div>
							<p className='graph-legende__text'>{element.idline}</p>
						</div>

					)
				}
				return null;
			})
		}
	</div>);
}

const Path = (props) => {

	return (
		<path
			fill='none'
			stroke={props.color}
			strokeWidth={3}
			d={
			props.coordinates.x.map((spot, index) => (
					(!index ? 'M ' : ' L ') +  props.xScale(spot) + ' ' + (props.yScale(props.coordinates.y[index])) 
				)
				).join(' ')
			}
		/>
	)

}

const Plots = (props) => {

	return (<>
		{

			props.plots.x.map((plot, index) => (
				<circle
					key={index.toString()}
					cx={props.xScale(plot)}
					cy={props.yScale(props.plots.y[index])}
					r={6}
					fill={props.color ? props.color : 'white'} />
			))
		}
	</>)

}


const VisualizationGraph = (props) => {

	const margins = props.margins;
	const domain = props.domain;
	const lines = props.lines;
	const fits = props.data.fits ? props.data.fits : null;
	const measures = props.data.measures ? props.data.measures : null;
	const colors = props.colors;
	const dimensions = props.dimensions;
	const ref = useRef(null);

	const coloredFits = fits ? (Object.keys(fits).length ? lines.map((line) => (
		{
		  coordinates: fits[line.idline],
		  color: line.colorline,
		  style: line.styleline
		}
	  )) : null) : null;

	const linesMinMax = useMemo(() => {

		if (measures === null && fits === null)
			return  ({
				x0: (typeof domain.x.min == "number") ? domain.x.min : 0, // default value when no data is present
				x1: (typeof domain.x.max == "number") ? domain.x.max : 1,
				y0: (typeof domain.y.min == "number") ? domain.y.min : 0,
				y1: (typeof domain.y.max == "number") ? domain.y.max : 1
			});

		const everyLines = [
			...(Array.isArray(measures) ? measures : []),
			...Object.values(fits)];
		const everyMinMax = everyLines.map((line) => {
			return ({
				x0: Math.min(...line['x']),
				x1: Math.max(...line['x']),
				y0: Math.min(...line['y']),
				y1: Math.max(...line['y'])
			});
		})

		const minMaxFromData = everyMinMax.reduce((previous, current) => (
			{
				x0: previous.x0 < current.x0 ? previous.x0 : current.x0,
				x1: previous.x1 > current.x1 ? previous.x1 : current.x1,
				y0: previous.y0 < current.y0 ? previous.y0 : current.y0,
				y1: previous.y1 > current.y1 ? previous.y1 : current.y1
			}
		));

		return ({
			x0: (typeof domain.x.min == "number") ? domain.x.min : minMaxFromData.x0, // min max of the data, exept when set by the user
			x1: (typeof domain.x.max == "number") ? domain.x.max : minMaxFromData.x1,
			y0: (typeof domain.y.min == "number") ? domain.y.min : minMaxFromData.y0,
			y1: (typeof domain.y.max == "number") ? domain.y.max : minMaxFromData.y1
		});

	}, [measures, fits, domain]);

	const [scales, setScales] = useState({
		x: d3
			.scaleLinear()
			.range([0, dimensions.width - (margins.left + margins.right)])
			.domain([linesMinMax.x0, linesMinMax.x1]),
		y: d3
			.scaleLinear()
			.range([dimensions.height - (margins.top + margins.bottom), 0])
			.domain([linesMinMax.y0, linesMinMax.y1]).nice()
	});

	const whiteSpace = (min, max) => {
		return (max - min) * 0.05;
	}

	const xWhisteSpace = whiteSpace(linesMinMax.x0, linesMinMax.x1); // extra 5% margin when the max value is given by the data, so that the data point does not lie on the axis
	const yWhisteSpace = whiteSpace(linesMinMax.y0, linesMinMax.y1);
	const xWhisteSpaceMax = (typeof domain.x.max == "number") ? 0 : xWhisteSpace ; // if the value is set by the user, no extra margin
	const xWhisteSpaceMin = (typeof domain.x.min == "number") ? 0 : xWhisteSpace ;
	const yWhisteSpaceMax = (typeof domain.y.max == "number") ? 0 : yWhisteSpace ; 
	const yWhisteSpaceMin = (typeof domain.y.min == "number") ? 0 : yWhisteSpace ;
	

	useEffect(() => {
		setScales({
			x: d3
				.scaleLinear()
				.range([0, dimensions.width - (margins.left + margins.right)])
				.domain([linesMinMax.x0 - xWhisteSpaceMin, linesMinMax.x1 + xWhisteSpaceMax]),
			y: d3
				.scaleLinear()
				.range([dimensions.height - (margins.top + margins.bottom), 0])
				.domain([linesMinMax.y0 - yWhisteSpaceMin, linesMinMax.y1 + yWhisteSpaceMax])
				.nice()
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dimensions, linesMinMax, xWhisteSpace, yWhisteSpace])

	useEffect(() => {

		if (props.isOnGoingExperiment)
			return ;

		const zoom = d3
		.zoom()
		.scaleExtent([0.9,3])
		.translateExtent([[0, 0], [dimensions.width, dimensions.height]])
		.on('zoom', (e) => {

			const zoomTransform = e.transform;
			const newXScale = zoomTransform.rescaleX(scales.x)
			const newYScale = zoomTransform.rescaleY(scales.y)

			setScales({
				x: d3
					.scaleLinear()
					.range([0, dimensions.width - (margins.left + margins.right)])
					.domain(newXScale.domain()),
				y: d3
					.scaleLinear()
					.range([dimensions.height - (margins.top + margins.bottom), 0])
					.domain(newYScale.domain())
					.nice()
			})

		})

		d3.select(ref.current).call(zoom)

	//	return () => { zoom.on('zoom', null) }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dimensions, props.isOnGoingExperiment])

	return (
	<>

			<svg width={dimensions.width} height={dimensions.height} ref={ref} >
				<rect
					transform={`translate(${margins.left}, ${margins.top})`}
					fill={colors.background}
					width={dimensions.width - (margins.left + margins.right)}
					height={dimensions.height - (margins.top + margins.bottom)}
				/>
				<defs>
				<clipPath id='clipath'>
					<rect	width={dimensions.width - (margins.left + margins.right)}
							height={dimensions.height - (margins.top + margins.bottom)}
							x='0' y='0' />
				</clipPath>
				</defs>
				{!(measures === null && fits === null) && // if data are present, then plot
					<g	id='svggraph'
						clipPath='url(#clipath)'
						width={dimensions.width - (margins.left + margins.right)}
						height={dimensions.height - (margins.top + margins.bottom)}
						transform={`translate(${margins.left}, ${margins.top})`} >
						{
							measures && measures.map((measure, index) => (
								<Plots
									key={index.toString()}
									xScale={scales.x}
									yScale={scales.y}
									plots={measure}
								/>
							))
						}
						{	coloredFits ?
									Object.entries(coloredFits).map(([fitname, fit]) => (
										fit.coordinates ?
											fit.style === 'Solid' ?
												<Path
													key={fitname}
													xScale={scales.x}
													yScale={scales.y}
													coordinates={fit.coordinates}
													color={fit.color}
												/>
											:	<Plots
													key={fitname}
													xScale={scales.x}
													yScale={scales.y}
													color={fit.color}
													plots={fit.coordinates}	/>
										: null
									))
							: null
						}
					</g>
				}
				<AxisY
					type='Graph'
					yScale={scales.y}
					dimensions={dimensions}
					margins={margins}
					colors={colors}
					label={props.axisLabel.y ? props.axisLabel.y : false }
					notation={props.notation}
				/>
				<AxisX
					xScale={scales.x}
					dimensions={dimensions}
					margins={margins}
					colors={colors}
					label={props.axisLabel.x ? props.axisLabel.x : false }
					notation={props.notation}
				/>
				<Background
					width={dimensions.width - (margins.left + margins.right)}
					height={dimensions.height - (margins.top + margins.bottom)}
					stroke={colors.text}
					margins={margins}
				/>
			</svg>

			<Legendes data={lines} />

		</>

	);

}

export default VisualizationGraph;