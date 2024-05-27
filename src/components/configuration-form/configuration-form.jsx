/*
	configuration form structure :

		const project; --> contains all the data and is send via fetch on submit

		<form>

			<ConfigurationFormHeader />

			<ConfigurationFormBody>

				<VisualizationForm>					--> repeatable element
					<VisualizationFormHeader />
					<VisualizationFormBody />
				</VisualizationForm>

			</ConfigurationFormBody>

		</form>
*/

import React, { useState, /*useContext*/ } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Spacer from '../spacer';
import { Button } from '../button';
import Message from '../message.jsx';
import { Submit, LabeledInput, LabeledTextarea } from '../form';
import { lineTemplate, fileTemplate, visualizationTemplate } from '../../utils/configuration-loader';
import VisualizationForm from "./visualization-form";
import visualizationTypes from './types.jsx';
import './configuration-form.css';
//import { AppStateContext } from '../../context.jsx';

const ConfigurationFormHeader = (props) => {

	return (<>

		{props.error && <Message message={props.error} type='error' />}

		<LabeledInput
			id='title'
			placeholder='Project title *'
			value={props.project.title}
			handleChange={props.projectFormUpdate}
			type='text'
			required={true}	/>

		<LabeledTextarea
			id='description'
			placeholder='Project description'
			value={props.project.description}
			handleChange={props.projectFormUpdate} />

	</>);
}


const ConfigurationFormBody = (props) => {
	const isSingle = props.visualizations.length < 2 ? true : false;
	return (<>

		<h2 className='configuration-form__title'>List of visualizations</h2>
		<div className='configuration-form__visualizations-list'>

			{props.visualizations.map((visualization, index) => (
				<VisualizationForm
					key={index.toString() + '-' + visualization.type}
					index={index}
					isSingle={isSingle}
					type={visualization.type}
					visualization={visualization}

					extraVariableAdd={props.extraVariableAdd}
					extraVariableRemove={props.extraVariableRemove}
					extraVariableUpdate={props.extraVariableUpdate}

					fileInputAdd={props.fileInputAdd}
					fileInputRemove={props.fileInputRemove}

					visualizationTypes={props.visualizationTypes}
					visualizationFormRemove={props.visualizationFormRemove}
					visualizationFormUpdate={props.visualizationFormUpdate}
					visualizationFormTypeUpdate={props.visualizationFormTypeUpdate}
					visualizationFormNotationUpdate={props.visualizationFormNotationUpdate}

					graphLinesAdd={visualization.type === 'Graph' ? props.graphLinesAdd : false }
					graphLinesRemove={visualization.type === 'Graph' ? props.graphLinesRemove : false }
					graphLinesUpdate={visualization.type === 'Graph' ? props.graphLinesUpdate : false }
					graphLinesStyleUpdate={visualization.type === 'Graph' ? props.graphLinesStyleUpdate : false }
					/>
			))}

		</div>

	</>);
}

const ConfigurationForm = (props) => {

	const [project, setProject] = useState(useLoaderData());

	const [formState, setFormState] = useState({
		isDisabled: false,
		error: false
	});

	const navigate = useNavigate();

	const ressource = (props.method === 'PUT' ? '/' + project.id + '.json': '');

//	const setIsAppListening = useContext(AppStateContext).setIsAppListening;

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormState({...formState,
			isDisabled: true
		})
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		fetch(window.API + '/api/configurations' + ressource, {
			method: props.method,
			credentials: 'include',
			headers: headers,
			body: JSON.stringify(project)
		})
		.then((response) => { return response.json() })
		.then(
			(result) => {
				if (result.hasOwnProperty('error')){
					setFormState({...formState,
						isDisabled: false,
						error: result.error
					});
				} else {
					navigate('/administration')
				}
			},
			(error) => {
				setFormState({...formState,
					isDisabled: false,
					error: error
				})
			}
		)
	}

	const projectFormUpdate = (e) => {
		const copy = structuredClone(project);
		copy[e.target.name] = e.target.value;
		setProject(copy);
	}

	const fileInputAdd = (e) => {
		const file = e.currentTarget.files[0];
		const copy = structuredClone(project);
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const fileReader = new FileReader();
		fileReader.onload = () => {
			copy.visualizations[index].pythonfile.name = file.name;
			copy.visualizations[index].pythonfile.data = fileReader.result;
			setProject(copy);
		};
		fileReader.readAsDataURL(file);
	}

	const extraVariableAdd = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[index].pythonfile.extravariables.push('')
		setProject(copy);
	}
	const extraVariableRemove = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		const variableIndex = e.currentTarget.closest('.form-extravariable__wrapper').dataset.index;
		copy.visualizations[index].pythonfile.extravariables.splice(variableIndex, 1);
		setProject(copy);
	}
	const extraVariableUpdate = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		const variableIndex = e.currentTarget.closest('.form-extravariable__wrapper').dataset.index;
		copy.visualizations[index].pythonfile.extravariables[variableIndex] = e.target.value;
		setProject(copy);
	}

	const fileInputRemove = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[index].pythonfile = structuredClone(fileTemplate);
		setProject(copy);
	}

	const visualizationFormAdd = (e) => {
		e.preventDefault();
		const newVisualizationsList = project.visualizations.concat(structuredClone(visualizationTemplate));
		const copy = structuredClone(project);
		copy.visualizations = newVisualizationsList;
		setProject(copy);
	}

	const visualizationFormRemove = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations.splice(index, 1);
		setProject(copy);
	}

	const visualizationFormUpdate = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[index][e.target.name] = e.target.value;
		setProject(copy);
	}

	const visualizationFormTypeUpdate = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[index]['type'] = e.target.value;
		setProject(copy);
	}

	const visualizationFormNotationUpdate = (e) => {
		const index = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[index]['notation'] = e.target.value;
		setProject(copy);
	}

	const graphLinesAdd = (e) => {
		const visualizationIndex = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const newLines = project.visualizations[visualizationIndex].lines.concat({...lineTemplate});
		const copy = structuredClone(project);
		copy.visualizations[visualizationIndex].lines = newLines;
		setProject(copy);
	}

	const graphLinesRemove = (e) => {
		const visualizationIndex = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const lineIndex = e.currentTarget.closest('.visualization-graph__line-list').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[visualizationIndex].lines.splice(lineIndex, 1);
		setProject(copy);
	}
	const graphLinesStyleUpdate = (e) => {
		const visualizationIndex = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const lineIndex = e.currentTarget.closest('.visualization-graph__line-list').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[visualizationIndex].lines[lineIndex]['styleline'] = e.target.value;
		setProject(copy);
	}

	const graphLinesUpdate = (e) => {
		const visualizationIndex = e.currentTarget.closest('.configuration-visualization').dataset.index;
		const lineIndex = e.currentTarget.closest('.visualization-graph__line-list').dataset.index;
		const copy = structuredClone(project);
		copy.visualizations[visualizationIndex].lines[lineIndex][e.target.name] = e.target.value;
		setProject(copy);
	}

	return (
		<>
		<Spacer size='small' />

		<form className='form configuration-form' onSubmit={handleSubmit}>

			<ConfigurationFormHeader
				project={project}
				projectFormUpdate={projectFormUpdate}
				error={formState.error} />

			<Spacer size='large' />

			<ConfigurationFormBody
				visualizations={project.visualizations}
				visualizationTypes={visualizationTypes}

				extraVariableAdd={extraVariableAdd}
				extraVariableRemove={extraVariableRemove}
				extraVariableUpdate={extraVariableUpdate}

				fileInputAdd={fileInputAdd}
				fileInputRemove={fileInputRemove}
				visualizationFormRemove={visualizationFormRemove}
				visualizationFormUpdate={visualizationFormUpdate}
				visualizationFormTypeUpdate={visualizationFormTypeUpdate}
				visualizationFormNotationUpdate={visualizationFormNotationUpdate}

				graphLinesAdd={graphLinesAdd}
				graphLinesRemove={graphLinesRemove}
				graphLinesUpdate={graphLinesUpdate}
				graphLinesStyleUpdate={graphLinesStyleUpdate}
			/>

			<div className='configuration-form__commands'>
				<Button icon='library_add' text='Add a new visualization' handleClick={visualizationFormAdd} />
				<Submit text='Save' disabled={formState.isDisabled} />
			</div>

		</form>
		</>
	);
}


export default ConfigurationForm;