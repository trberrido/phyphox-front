import React from 'react';
import './message.css';

/*

props{
	type : string
	message : string | informationObject
}

informationObject = {
	description: string
	url: string
}

*/
const Message = (props) => {
	return (
			props.message && typeof props.message === 'object' ?
				<div className='message__container'>
					<p className={"message message--" + (props.type ? props.type : 'info')}>{props.message.description}</p>
					<video loop controls autoPlay muted playsInline>
						<source src={window.API + props.message.url} type="video/webm" />
					</video>
				</div>
			:
			<p className={"message message--" + (props.type ? props.type : 'info')}>{props.message}</p>
	)
}

export default Message;