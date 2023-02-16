import './spacer.css';

const Spacer = (props) => {
	return (
		<div className={'spacer' + (props.size ? ('--' + props.size) : '')}></div>
	);
}

export default Spacer;