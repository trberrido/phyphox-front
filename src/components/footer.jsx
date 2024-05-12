import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';

class Footer extends React.Component {
	render (){
	return (
		<footer className='footer'>
			<Link
				className='footer__link'
				to="/credits">
				Credits</Link>
			<a
				className='footer__link'
				target="_blank"
				href="https://github.com/trberrido/phyphox"
				rel="noreferrer">
				Download app on Github</a>
		</footer>
	);
	}
}

export default Footer;
