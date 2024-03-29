import { useMemo } from "react";
import * as d3 from "d3";
import formatValueAs from "../../utils/notation";

const AxisY = (props) => {

	const dimensions = props.dimensions;
	const margins = props.margins;

	const ticks = useMemo(() => {
		return props.yScale
						.ticks(4)
						.filter(tick => {
							return (Number.isInteger(tick))
						})
						.map((value) => {
							return ({value: value, yOffset: props.yScale(value)})
						})
	}, [props]);

	return (
		<svg >
			{
				props.label ?
					<text
						fill='currentColor'
						transform='rotate(-90)'
						//textAnchor='end'  // caption at the top of the axis
						textAnchor='middle'  // caption at the middle of the axis
						fontSize='30'
						//x={margins.top * -1 } // caption at the top of the axis
						x={- dimensions.height/2 } // caption at the middle of the axis
						y='30' >
							{props.label}
						</text>
				:
					null
			}
			<path d={[
				'M', margins.left, margins.top,
				'v', dimensions.height - (margins.top + margins.bottom),
			].join(' ')} fill='none' stroke='currentColor' />
			{
				ticks.map(({value, yOffset}) => (
					<g
						key={value}
						transform={`translate(0, ${yOffset + margins.top})`}
					>
						<line x1={margins.left} x2={dimensions.width - margins.right} stroke={props.colors.stick} />
						<text
							transform={`translate(${margins.left - 10}, ${(props.type === 'Histogram') ? 0 : 10})`}
							fontSize='30'
							textAnchor='end'
							fill='currentColor'
						>
							{(props.type === 'Graph' && props.notation === 'Scientific') ? formatValueAs(value, props.notation) : value}
						</text>

					</g>

				))
			}
		</svg>
	);
}

const AxisX = (props) => {

	const dimensions = props.dimensions;
	const margins = props.margins;

	const ticks = useMemo(() => {
		return props.xScale.ticks(4)
			.map(value => ({ value, xOffset: props.xScale(value)}))
	}, [props]);

	return (
		<svg >
		{
				props.label ?
					<text
						fill='currentColor'
						// textAnchor='end' // caption at the right of the axis
						textAnchor='middle' // caption at the middle of the axis
						fontSize='30'
						//x={dimensions.width - margins.right} // caption at the right of the axis
						x={dimensions.width/2} // caption at the middle of the axis
						y={dimensions.height - 8}
					>{props.label}</text>
				:
					null
			}
			<path d={[
					'M', margins.left, (dimensions.height - margins.bottom),
					'h', dimensions.width - (margins.left + margins.right)
				].join(' ')}
				fill='none' stroke='currentColor' />
				{
					ticks.map(({value, xOffset}, index) => (
						<g
							key={value + index.toString()}
							transform={`translate(${xOffset + margins.left}, 0)`}
						>
							<line
								y1={margins.top}
								y2={dimensions.height - margins.bottom}
								stroke={props.colors.stick} />

							<text
								transform={`translate(0,${dimensions.height + margins.top - margins.bottom})`}
								fontSize='30'
								textAnchor='middle'
								fill='currentColor'
							>
								{props.notation === 'Scientific' ? formatValueAs(value, props.notation) : value}
							</text>
						</g>
					))
				}
		</svg>
	);
}

export {
	AxisX,
	AxisY
}