import * as d3 from "d3";

const formatValueAs = (value, notation) => {
	const scientificNotation = d3.format('.1e');
	return notation === 'Scientific' ? scientificNotation(parseFloat(value)) : parseFloat(value).toFixed(2);
}

export default formatValueAs;