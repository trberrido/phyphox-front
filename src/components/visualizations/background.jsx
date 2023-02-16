const Background = (props) => {

	return (
		<rect
			transform={`translate(${props.margins.left}, ${props.margins.top})`}
			stroke={props.stroke} fill='transparent'
			width={props.width}
			height={props.height}
		/>
	);
}

export default Background;