import React from 'react';

import './form.css';

const Fieldset = (props) => {
	return (
		<fieldset className={'form__fieldset' + (props.className ? ' ' + props.className : '')}>
			<legend className={'form-fieldset__legend' + (props.legendClassName ? ' ' + props.legendClassName : '')}>{props.legend}</legend>
			{props.children}
		</fieldset>
	);
}

const LabeledInput = (props) => {

	const modificationCSS = props.modificationCSS ? props.modificationCSS : 'regular';
	const classInputType = props.type === 'color' ? '-color' : '';
	const classIsHidden = props.isHidden ? ' form__labeled-input-container--hidden' : '';
	const min = props.min === 'undefined' ? null : props.min;
	const max = props.max === 'undefined' ? null : props.max;

	return (
		<div className={'form__labeled-input-container' + classIsHidden + (props.modificationCSS ? ' form__labeled-input-container--' + props.modificationCSS : '')} >
			<label
				htmlFor={props.id}
				className={'form__label form__label--' + modificationCSS }>
					{props.placeholder}
			</label>
			{
				props.icon ?
				<span className='form__input-icon'>{props.icon}</span>
				: null
			}
			<input
				readOnly={props.readOnly}
				value={props.value}
				onChange={props.handleChange}
				name={props.id}
				className={
					'form__input' + classInputType
					+ ' form__input--' + modificationCSS
					+ (props.icon ? ' form__input-with-icon' : ' form__input-text-only')
				}
				placeholder={props.placeholder}
				min={min}
				max={max}
				type={props.type ? props.type : 'text'}
				accept={props.accept ? props.accept : null}
				required={props.required} />
		</div>
	);
}

const Radio = (props) => {
	return (<span className='input-radio__wrapper'>
		<input
			className='input-radio__input'
			onChange={props.handleChange}
			name={props.id}
			required={props.required}
			value={props.placeholder}
			checked={props.checked}
			type='radio' />
		<label htmlFor={props.id} >
			{props.placeholder}
		</label>
	</span>)
}

const LabeledTextarea = (props) => {
	return (<>
		<label
			htmlFor={props.id}
			className='form__label form__label--regular'>
				{props.placeholder}
		</label>
		<textarea
			value={props.value}
			onChange={props.handleChange}
			name={props.id}
			className='form__textarea form__textarea--regular'
			placeholder={props.placeholder}
			type={props.type}
			required={props.required} />
	</>)
}

const Submit = (props) => {
	return (
		<input
			className={'form__submit button button--important ' +  (props.disabled ? 'form__submit--disabled' : '') }
			disabled={props.disabled}
			type='submit'
			value={props.text} />
	);
}

export {LabeledInput, LabeledTextarea, Submit, Radio, Fieldset};