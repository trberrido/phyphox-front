import React from 'react';
import './message.css';

const Message = (props) => {
	return (
		<p className={"message message--" + (props.type ? props.type : 'info')}>{props.message}</p>
	)
}

export default Message;