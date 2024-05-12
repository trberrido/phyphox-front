import React from 'react';

import './footer.css';

class Footer extends React.Component {
	render (){
	return (
		<footer className='footer'>
			<a
				className='footer__link'
				href="/credits">
				Credits</a>
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
