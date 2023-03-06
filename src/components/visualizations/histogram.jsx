import { useMemo } from 'react';

import * as d3 from "d3";

import Background from "./background";
import { AxisX, AxisY } from "./axis";

const Bar = (props) => {

	const maxHeight = props.dimensions.height - (props.margins.top + props.margins.bottom);
	
	return (
		<rect
			stroke='black'
			fill='grey'
			x={props.xScale(props.bucket.x0)}
			width={props.xScale(props.bucket.x1) - props.xScale(props.bucket.x0)}
			y={props.yScale(props.bucket.length)}
			height={maxHeight - props.yScale(props.bucket.length)}
		/>
	)
}


const VisualizationHistogram = (props) => {
	
	const colors = props.colors;
	const margins = props.margins;
	const data = props.data;
	const dimensions = props.dimensions;

	const buckets = useMemo(() => {
		const bucketor = d3.bin();
		return bucketor(data);
	}, [data]);

	const yScale = useMemo(()=>{
		return d3
			.scaleLinear()
			.range([dimensions.height - (margins.top + margins.bottom), 0])
			.domain([0, 1.1 * Math.max(...buckets.map((bucket) => bucket.length))])
			.nice()
	}, [buckets, dimensions, margins]);

	const xScale = useMemo(() => {
		return d3
			.scaleLinear()
			.range([0, dimensions.width - (margins.left + margins.right)])
			.domain([Math.min(...data), Math.max(...data)])
			.nice()
	}, [data, dimensions, margins]);
	
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
					yScale={yScale}
					dimensions={dimensions}
					margins={margins}
					colors={colors}
					label={props.axisLabel.y ? props.axisLabel.y : false }
				/>
				<AxisX
					xScale={xScale}
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
			
				<span className='histogram-infos__item'>mean: {d3.mean(data).toFixed(2)}</span>
				<span className='histogram-infos__item'>median: {d3.median(data).toFixed(2)}</span>
				<span className='histogram-infos__item'>deviation: {data.length > 1 ? d3.deviation(data).toFixed(2) : ' - '}</span>

			</p>
			

		</>
	);

}

export default VisualizationHistogram;