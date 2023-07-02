import { useMemo } from "react";
import * as d3 from "d3";

const AxisY = (props) => {

	const dimensions = props.dimensions;
	const margins = props.margins;

	const ticks = useMemo(() => {
		const scientificNotation = d3.format('.1e');
		return props.yScale
						.ticks(4)
						.filter(tick => {
							return (Number.isInteger(tick))
						})
						.map((value) => {
							const displayedValue = value < 999 ? value : scientificNotation(value)
							return ({value: displayedValue, yOffset: props.yScale(value)})
						})
	}, [props]);

	return (
		<svg >
			{
				props.label ?
					<text
						fill='currentColor'
						transform='rotate(-90)'
						textAnchor='end'
						fontSize='30'
						x={margins.top * -1}
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
							transform={`translate(${margins.left - 10}, ${(props.type === 'Histogram') ? 0 : 20})`}
							fontSize='30'
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
		return props.xScale.ticks(4)
			.map(value => ({ value, xOffset: props.xScale(value)}))
	}, [props]);

	return (
		<svg >
		{
				props.label ?
					<text
						fill='currentColor'
						textAnchor='end'
						fontSize='30'
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
								transform={`translate(0,${dimensions.height + margins.top - margins.bottom})`}
								fontSize='30'
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