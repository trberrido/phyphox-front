import { useMemo } from "react";

const AxisY = (props) => {

	const dimensions = props.dimensions;
	const margins = props.margins;

	const ticks = useMemo(() => {
		return props.yScale
						.ticks()
						.map(value => ({
							value, yOffset: props.yScale(value)
						}))
	}, [props]);

	return (
		<svg >
			{
				props.label ? 
					<text
						fill='currentColor'
						transform='rotate(-90)'
						textAnchor='end'
						x={margins.top * -1}
						y='15' >
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
						transform={`translate(0, ${yOffset + 10})`}
					>
						<line x1={margins.left} x2={dimensions.width - margins.right} stroke={props.colors.stick} />
						<text
							transform={`translate(${margins.left - 10}, 2)`}
							fontSize='10'
							textAnchor='end'
							fill='currentColor'
						>
							{value}
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
		return props.xScale.ticks()
			.map(value => ({ value, xOffset: props.xScale(value)}))
	}, [props]);

	return (
		<svg >
		{
				props.label ? 
					<text
						fill='currentColor'
						textAnchor='end'
						x={dimensions.width - margins.right}
						y={dimensions.height}
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
								transform={`translate(0,${dimensions.height + margins.top - margins.bottom + 10})`}
								fontSize='10'
								textAnchor='middle'
								fill='currentColor'
							>
								{value}
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