import { useEffect, useMemo, useRef, useState } from 'react';

import * as d3 from "d3";

import Background from "./background";
import { AxisX, AxisY } from "./axis";

const Legendes = (props) => {
	return (<div className='graph-legendes__wrapper'>
		{
			props.data.map((element, index) => (
				<div
					className='graph-legende'
					key={element.idline + '_' + index.toString()}>
					<div style={{background:element.colorline}} className='graph-legende__colorsquare'></div>
					<p className='graph-legende__text'>{element.idline}</p>
				</div>
			))
		}
	</div>);
}

const Path = (props) => {

	return (
		<path
			fill='none'
			stroke={props.color}
			d={
			props.spotsCoordinates[0].map((spot, index) => (
					(!index ? 'M ' : ' L ') +  props.xScale(spot) + ' ' + (props.yScale(props.spotsCoordinates[1][index])) 
				)
				).join(' ')
			}
		/>
	)

}

const Plots = (props) => {

	return (<>
		{

			props.plots[0].map((plot, index) => (
				<circle
					key={index.toString()}
					cx={props.xScale(plot)}
					cy={props.yScale(props.plots[1][index])}
					r={1}
					fill='currentColor' />
			))
		}
	</>)

}


const VisualizationGraph = (props) => {

	const margins = props.margins;
	const lines = props.lines;
	const pathsCoordinates = props.data[1];
	const plots = props.data[0];
	const colors = props.colors;
	const dimensions = props.dimensions;
	const ref = useRef(null);
	const paths = lines.map((value) => (
		{
			coordinates: pathsCoordinates[value.idline],
			color: value.colorline
		}
	));
	const linesMinMax = useMemo(() => {
	
		const everyLines = [...plots, ...Object.values(pathsCoordinates)];
		const everyMinMax = everyLines.map((line) => {			
			return ({
				x0: Math.min(...line[0]),
				x1: Math.max(...line[0]),
				y0: Math.min(...line[1]),
				y1: Math.max(...line[1])
			});
		})

		return everyMinMax.reduce((previous, current) => (
			{
				x0: previous.x0 < current.x0 ? previous.x0 : current.x0,
				x1: previous.x1 > current.x1 ? previous.x1 : current.x1,
				y0: previous.y0 < current.y0 ? previous.y0 : current.y0,
				y1: previous.y1 > current.y1 ? previous.y1 : current.y1
			}
		));

	}, [plots, pathsCoordinates]);

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

	useEffect(() => {
		setScales({
			x: d3
				.scaleLinear()
				.range([0, dimensions.width - (margins.left + margins.right)])
				.domain([linesMinMax.x0, linesMinMax.x1]),
			y: d3
				.scaleLinear()
				.range([dimensions.height - (margins.top + margins.bottom), 0])
				.domain([linesMinMax.y0, linesMinMax.y1])
				.nice()
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dimensions])

	useEffect(() => {

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
	}, [dimensions])

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

					<g	id='svggraph'
						clipPath='url(#clipath)'
						width={dimensions.width - (margins.left + margins.right)}
						height={dimensions.height - (margins.top + margins.bottom)}
						transform={`translate(${margins.left}, ${margins.top})`} >
						{		
							plots.map((path, index) => (
								<Plots 
									key={index.toString()}
									xScale={scales.x}
									yScale={scales.y}
									plots={path}
								/>
							))
						}
						{		
							Object.entries(paths).map(([pathname, path], index) => (
								<Path 
									key={pathname + '_' + index.toString()}
									xScale={scales.x}
									yScale={scales.y}
									spotsCoordinates={path.coordinates}
									color={path.color}
								/>
							))
						}
					</g>
				
				

				<AxisY
					yScale={scales.y}
					dimensions={dimensions}
					margins={margins}
					colors={colors}
					label={props.axisLabel.y ? props.axisLabel.y : false }
				/>
				<AxisX
					xScale={scales.x}
					dimensions={dimensions}
					margins={margins}
					colors={colors}
					label={props.axisLabel.x ? props.axisLabel.x : false }
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