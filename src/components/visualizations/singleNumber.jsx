
//import * as d3 from "d3";

const VisualizationSingleNumber = (props) => {
	// const scientificNotation = d3.format('.1e');
	// note : to display scientific notation: scientificNotation(parseFloat(props.data))
	return(<>
		<p className='visualization-number__output'>{parseFloat(props.data).toFixed(2)}</p>
		<p className='visualization-number__unit'>{props.unit}</p>
	</>);
}

export default VisualizationSingleNumber;