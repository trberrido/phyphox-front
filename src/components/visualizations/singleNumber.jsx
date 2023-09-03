import formatValueAs from "../../utils/notation";

const VisualizationSingleNumber = (props) => {
	return(<>
		<p className='visualization-number__output'>{formatValueAs(props.data, props.notation)}</p>
		<p className='visualization-number__unit'>{props.unit}</p>
	</>);
}

export default VisualizationSingleNumber;