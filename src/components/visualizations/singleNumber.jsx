
import * as d3 from "d3";

const VisualizationSingleNumber = (props) => {
	const scientificNotation = d3.format('.1e')
	return(<>
		<p className='visualization-number__output'>{scientificNotation(parseFloat(props.data))}</p>
		<p className='visualization-number__unit'>{props.unit}</p>
	</>);
}

export default VisualizationSingleNumber;