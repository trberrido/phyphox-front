import formatValueAs from "../../utils/notation";

const VisualizationSingleNumber = (props) => {
	let dataSN ;
	if (isNaN(formatValueAs(props.data, props.notation))){
		dataSN = "_.__";
	} else {
		dataSN =  formatValueAs(props.data, props.notation);
	}
	return(<>
		<p className='visualization-number__output'>{dataSN}</p>
		<p className='visualization-number__unit'>{props.unit}</p>
	</>);
}

export default VisualizationSingleNumber;