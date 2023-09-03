import React from "react";

import { Fieldset, LabeledInput, LabeledTextarea, Radio } from "../form";
import { ButtonIcon, ButtonAskingConfirmation, Button } from "../button";
import Spacer from '../spacer.jsx';

const VisualizationFormBody = (props) => {
	const SpecificVisualizationType = props.typesAvailable[props.type].component;
	return (
		<SpecificVisualizationType
			data={props.visualization}
			index={props.index}
			hasPythonFile={props.visualization.pythonfile.name ? true : false}
			visualizationFormUpdate={props.visualizationFormUpdate}
			graphLinesAdd={props.graphLinesAdd ? props.graphLinesAdd : false }
			graphLinesRemove={props.graphLinesRemove ? props.graphLinesRemove : false }
			graphLinesUpdate={props.graphLinesUpdate ? props.graphLinesUpdate : false }
			graphLinesStyleUpdate={props.graphLinesStyleUpdate ? props.graphLinesStyleUpdate : false }
		/>
	);
}

const VisualizationFormHeader = (props) => {

	const notations = ['Decimal', 'Scientific'];

	return (<>
		<LabeledInput
			id='title'
			placeholder='Visualization title *'
			value={props.visualization.title}
			handleChange={props.visualizationFormUpdate}
			type='text'
			required={true} />

		<LabeledTextarea
			id='description'
			handleChange={props.visualizationFormUpdate}
			placeholder='Comments'
			value={props.visualization.description} />

		<Fieldset legend='Python'>
		{
			props.visualization.pythonfile.name ?
				<>
					<div>
					<ButtonAskingConfirmation
						text={'Remove ' + props.visualization.pythonfile.name}
						confirmedAction={props.fileInputRemove}
					/>
					</div>
					{
						props.visualization.pythonfile.extravariables.map((variable, index) => (
							<div
								key={index.toString()}
								className='form-extravariable__wrapper'
								data-index={index.toString()}
							>
								<LabeledInput
									id={'extravariable_' + index.toString()}
									placeholder='variable name'
									value={variable}
									handleChange={props.extraVariableUpdate}
									type='text' />

								<ButtonIcon
									value='delete'
									classes='form-extravariable__delete-button'
									handleClick={props.extraVariableRemove} />
							</div>
						))
					}
					<Button
						text='Add a variable'
						handleClick={props.extraVariableAdd}
						/>
				</>
			:
			<>
				<LabeledInput
					id='pythonfile'
					placeholder='Python file'
					modificationCSS='variant'
					handleChange={props.fileInputAdd}
					accept='.py'
					type='file'
				/>
				<a className='configuration__link' href={window.API + '/api/python'} rel='noreferrer' target='_blank'>Which version of python should I use ?</a>	
			</>
		}
		</Fieldset>

		<Spacer size='small' />

		<Fieldset legend='Select type *'>
			{Object.keys(props.visualizationTypes).map((type, index) => (
				<Radio
					id={'type-' + props.index.toString()}
					placeholder={type}
					handleChange={props.visualizationFormTypeUpdate}
					key={index.toString() + '-' + type}
					required={true}
					checked={props.visualization.type === type ? true : false} />
			))}
		</Fieldset>

		<Fieldset legend='Notation *'>
			{notations.map((notation, index) => (
				<Radio
					id={'notation-' + props.index.toString()}
					placeholder={notation}
					handleChange={props.visualizationFormNotationUpdate}
					key={index.toString() + '-' + notation}
					required={true}
					checked={props.visualization.notation === notation ? true : false} />
			))}
		</Fieldset>

	</>);
}

const VisualizationForm = (props) => {
	return (
		<div data-index={props.index}
			className='configuration-visualization'>

			{props.isSingle ?
				null :
				<ButtonIcon
				value='delete'
				classes='configuration-visualization__delete-button'
				handleClick={props.visualizationFormRemove} />}

			<VisualizationFormHeader
				index={props.index}

				extraVariableAdd={props.extraVariableAdd}
				extraVariableRemove={props.extraVariableRemove}
				extraVariableUpdate={props.extraVariableUpdate}

				fileInputAdd={props.fileInputAdd}
				fileInputRemove={props.fileInputRemove}

				visualizationTypes={props.visualizationTypes}
				visualization={props.visualization}
				visualizationFormTypeUpdate={props.visualizationFormTypeUpdate}
				visualizationFormNotationUpdate={props.visualizationFormNotationUpdate}
				visualizationFormUpdate={props.visualizationFormUpdate} />

			<Spacer size='small' />

			{props.type && <VisualizationFormBody
								typesAvailable={props.visualizationTypes}
								type={props.type}
								index={props.index}
								visualization={props.visualization}
								value={props.visualization.id}
								visualizationFormUpdate={props.visualizationFormUpdate}

								graphLinesAdd={props.graphLinesAdd ? props.graphLinesAdd : false}
								graphLinesRemove={props.graphLinesRemove ? props.graphLinesRemove : false}
								graphLinesUpdate={props.graphLinesUpdate ? props.graphLinesUpdate : false}
								graphLinesStyleUpdate={props.graphLinesStyleUpdate ? props.graphLinesStyleUpdate : false}
			/>}

	</div>);
}


export default VisualizationForm;