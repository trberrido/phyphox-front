import { useMemo } from 'react';

import * as d3 from "d3";

import Background from "./background";
import { AxisX, AxisY } from "./axis";

import formatValueAs from "../../utils/notation";

const Bar = (props) => {

	const maxHeight = props.dimensions.height - (props.margins.top + props.margins.bottom);
	const minWdith = props.dimensions.width / props.bins;
	const width = props.xScale(props.bucket.x1) - props.xScale(props.bucket.x0) ? props.xScale(props.bucket.x1) - props.xScale(props.bucket.x0) : minWdith;

	return (
		<rect
			stroke='black'
			fill='white'
			opacity={.8}
			x={props.xScale(props.bucket.x0)}
			width={width}
			y={props.yScale(props.bucket.length)}
			height={maxHeight - props.yScale(props.bucket.length)}
		/>
	);

}


const VisualizationHistogram = (props) => {

	const colors = props.colors;
	const margins = props.margins;
	const data = props.data;
	const dimensions = props.dimensions;
	const domain = props.domain;
	const bins = props.bins ? parseInt(props.bins) : 10;

	const buckets = useMemo(() => {
		const [min, max] = d3.extent(data);
		const thresholds = d3.range(min, max, (max - min) / bins);
		const bucketor = d3.bin().thresholds(thresholds)
		return bucketor(data);
	}, [data, bins]);

	const yScale = useMemo(()=>{
		return d3
			.scaleLinear()
			.range([dimensions.height - (margins.top + margins.bottom), 0])
			.domain([0, 1.1 * Math.max(...buckets.map((bucket) => bucket.length))])
			.nice()
	}, [buckets, dimensions, margins]);

	const xScale = useMemo(() => {
		const getMinMax = () => {
			let [min, max] = d3.extent(data);
			if (domain.x.min)
				min = domain.x.min;
			if (domain.x.max)
				max = domain.x.max;
			return [min, max];
		};
		const [min, max] = getMinMax();
		return d3
			.scaleLinear()
			.range([0, dimensions.width - (margins.left + margins.right)])
			.domain([min, max])
	}, [data, dimensions, margins, domain]);

	return (
		<>
			<svg width={dimensions.width} height={dimensions.height} >
				<rect
					transform={`translate(${margins.left}, ${margins.top})`}
					fill={colors.background}
					width={dimensions.width - (margins.left + margins.right)}
					height={dimensions.height - (margins.top + margins.bottom)}
				/>
				<g
					width={dimensions.width - (margins.left + margins.right)}
					height={dimensions.height - (margins.top + margins.bottom)}
					transform={`translate(${margins.left}, ${margins.top})`}>
					{
						buckets.map((bucket, index) => (
							<Bar key={index.toString()}
								bins={bins}
								xScale={xScale}
								yScale={yScale}
								bucket={bucket}
								dimensions={dimensions}
								margins={margins}
							/>
						))
					}
				</g>
				<AxisY
					type='Histogram'
					yScale={yScale}
					dimensions={dimensions}
					margins={margins}
					colors={colors}
					label={props.axisLabel.y ? props.axisLabel.y : false }
				/>
				<AxisX
					xScale={xScale}
					notation={props.notation}
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


			<p className='histogram-infos'>

				<span className='histogram-infos__item'>mean: {formatValueAs(d3.mean(data), props.notation)}</span>
				<span className='histogram-infos__item'>median: {formatValueAs(d3.median(data), props.notation)}</span>
				<span className='histogram-infos__item'>deviation: {data.length > 1 ? formatValueAs(d3.deviation(data), props.notation) : ' - '}</span>

			</p>

		</>
	);

}

export default VisualizationHistogram;