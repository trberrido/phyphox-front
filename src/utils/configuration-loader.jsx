const lineTemplate = {
	style: 'Solid',
	colorline: '#ffffff',
	idline: ''
}

const fileTemplate = {
	name: null,
	data: null,
	extravariables: []
}

const visualizationTemplate = {
	title: '',
	description: '',
	type: '',
	pythonfile: {...fileTemplate}
}

/*
	lines: [
		{...lineTemplate}
	]
*/

const configurationLoader = async ({ params }) => {
	const configuration = await fetch(window.BASE + '/api/configurations/' + params.configurationID + '.json',
		{credentials: 'include', method: 'GET'})
		.then((response) => response.json())
		.then((result) => ( result ))
	return configuration;

}

const configurationDefault = () => {
	return (
		{
			id: '',
			title: '',
			description: '',
			visualizations: [
				structuredClone(visualizationTemplate)
			]
		}
	);
}

export {lineTemplate, visualizationTemplate, fileTemplate, configurationLoader, configurationDefault};