
const VisualizationSingleNumber = (props) => {
	return(<>
		<p className='visualization-number__output'>{parseFloat(props.data).toFixed(2)}</p>
		<p className='visualization-number__unit'>{props.unit}</p>
	</>);
}

export default VisualizationSingleNumber;