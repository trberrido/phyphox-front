import React from "react";
import { lineTemplate } from "../../utils/configuration-loader.jsx";
import { Button, ButtonIcon } from '../button.jsx'
import { LabeledInput, Fieldset, Radio } from "../form";
import Spacer from '../spacer';

const SingleNumberForm = (props) => {
	return (<>
		<Fieldset legend='phyphox data'>
			<LabeledInput
				id='id'
				required={true}
				placeholder='Data ID *'
				modificationCSS='variant'
				value={props.data.id ? props.data.id : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />
		</Fieldset>

		<Spacer size='xxsmall' />

		<Fieldset legend='Options'>
			<LabeledInput
				id='unit'
				placeholder='Unit'
				modificationCSS='variant'
				value={props.data.unit ? props.data.unit : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />
		</Fieldset>
	</>);
}

const HistogramForm = (props) => {
	return (<>
		<Fieldset legend='phyphox data'>
			<LabeledInput
				id='id'
				required={true}
				modificationCSS='variant'
				placeholder='Data ID *'
				value={props.data.id ? props.data.id : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />
		</Fieldset>

		<Spacer size='xxsmall' />

		<Fieldset legend='Options'>

			<LabeledInput
				id='bins'
				modificationCSS='variant'
				placeholder='Bins'
				value={props.data.bins ? props.data.bins : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

			<Spacer size='regular' />

			<LabeledInput
				id='labelx'
				modificationCSS='variant'
				placeholder='x axis label'
				value={props.data.labelx ? props.data.labelx : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />

			<LabeledInput
				id='labely'
				modificationCSS='variant'
				placeholder='y axis label'
				value={props.data.labely ? props.data.labely : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />

			<Spacer size='regular' />

			<LabeledInput
				id='xmin'
				modificationCSS='variant'
				placeholder='x axis min'
				value={props.data.xmin ? props.data.xmin : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

			<LabeledInput
				id='xmax'
				modificationCSS='variant'
				placeholder='x axis max'
				value={props.data.xmax ? props.data.xmax : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

{
	/*
	<LabeledInput
		id='bucketsnumber'
		placeholder='Number of buckets'
		value={props.data.bucketsnumber ? props.data.bucketsnumber : ''}
		handleChange={props.visualizationFormUpdate}
		type='number' />
	*/
}
		</Fieldset>
	</>)
}

const GraphForm = (props) => {
	if (props.data['lines'] === undefined)
		props.data['lines'] = [{...lineTemplate}];
	const lineIsSingle = props.data.lines.length < 2 ? true : false;

	return (<>

		<Fieldset legend='phyphox data'>
			<LabeledInput
				id='idx'
				modificationCSS='variant'
				required={true}
				placeholder='Data ID x axis *'
				value={props.data.idx ? props.data.idx : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />
			<LabeledInput
				id='idy'
				modificationCSS='variant'
				required={true}
				placeholder='Data ID y axis *'
				value={props.data.idy ? props.data.idy : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />
		</Fieldset>

		<Spacer size='xxsmall' />

		<Fieldset legend='Options' >

			<LabeledInput
				id='labelx'
				modificationCSS='variant'
				placeholder='x axis label'
				value={props.data.labelx ? props.data.labelx : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />

			<LabeledInput
				id='xmin'
				modificationCSS='variant'
				placeholder='x axis min'
				value={props.data.xmin ? props.data.xmin : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

			<LabeledInput
				id='xmax'
				modificationCSS='variant'
				placeholder='x axis max'
				value={props.data.xmax ? props.data.xmax : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

			<Spacer size='regular' />

			<LabeledInput
				id='labely'
				modificationCSS='variant'
				placeholder='y axis label'
				value={props.data.labely ? props.data.labely : ''}
				handleChange={props.visualizationFormUpdate}
				type='text' />

			<LabeledInput
				id='ymin'
				modificationCSS='variant'
				placeholder='y axis min'
				value={props.data.ymin ? props.data.ymin : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

			<LabeledInput
				id='ymax'
				modificationCSS='variant'
				placeholder='y axis max'
				value={props.data.ymax ? props.data.ymax : ''}
				handleChange={props.visualizationFormUpdate}
				type='number' />

{
	/*
	<LabeledInput
		id='granularity'
		placeholder='Granularity'
		value={props.data.granularity ? props.data.granularity : ''}
		handleChange={props.visualizationFormUpdate}
		type='number' />
	*/
}

		</Fieldset>

{
	<>
		<Spacer size='xxsmall' />

		{
			props.hasPythonFile ?
			<Fieldset legend='Customization'>

				{
					props.data.lines.map((line, lineIndex) => (
						<div
							key={lineIndex.toString() + '_line'}
							data-index={lineIndex.toString()}
							className='visualization-graph__line-list'>

							{lineIsSingle ? null :
								<ButtonIcon
									value='delete'
									classes='graph-line__delete-button'
									handleClick={props.graphLinesRemove} />
							}

							{
								<Fieldset
									className='form__fieldset--single-line'
									legend='Select line style'
									legendClassName='form-fieldset__legend--single-line'>

								{
									['Solid', 'Dotted'].map((shape, styleIndex) => (

										<Radio
											id={'styleline-' + props.index.toString() + '-' + lineIndex.toString()}
											placeholder={shape}
											handleChange={props.graphLinesStyleUpdate}
											key={styleIndex.toString() + '-linestyle'}
											checked={line.styleline === shape ? true : false} />
									))
								}
							</Fieldset>
							}

							<LabeledInput
								id='idline'
								placeholder='Line id'
								value={line.idline ? line.idline : ''}
								modificationCSS='variant'
								handleChange={props.graphLinesUpdate} />

							<LabeledInput
								id='colorline'
								placeholder='Color'
								type='color'
								modificationCSS='variant'
								value={line.colorline ? line.colorline : '#ffffff'}
								handleChange={props.graphLinesUpdate} />

					{
						/*

							<Fieldset legend='Select line style'>

								{
									[	{ name: 'Solid', value: 'solid'},
										{ name: 'Dashed', value: 'dashed'},
										{ name: 'Dotted', value: 'dotted'},
									].map((shape, styleIndex) => (

										<Radio
											id={'styleline-' + props.index.toString() + '-' + lineIndex.toString()}
											placeholder={shape.name}
											handleChange={props.graphLinesStyleUpdate}
											key={styleIndex.toString() + '-linestyle'}
											checked={line.style === shape.name ? true : false} />
									))
								}
							</Fieldset>
						*/
					}


						</div>
					))

				}
				<Button
					text='Add a new line'
					handleClick={props.graphLinesAdd}
					/>

			</Fieldset>
		: null }
		</>
	}
	</>);

}

const visualizationTypes = {
	'Single Number': {
		component: SingleNumberForm,
		id: '', unit: ''
	},
	'Histogram': {
		component: HistogramForm,
		id: '',
		labelx: '', xmin: '', xmax: '',
		labely: '', ymin: '', ymax: '',
		bucketsnumber: ''
	},
	'Graph': {
		component: GraphForm,
		idx: '', idy: '',
		labelx: '', xmin: '', xmax: '',
		labely: '', ymin: '', ymax: '',
		lines: []
	}
}

export default visualizationTypes;