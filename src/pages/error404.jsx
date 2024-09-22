import React from 'react';

import {TitleLight} from '../components/title.jsx';
import { Link } from 'react-router-dom';

import './error404.css';

class PageError404 extends React.Component {
	render(){
		return(
			<main className='main-content'>
				<TitleLight header='error 404' content='Page not found' />
				<Link className='not-found__link' to='/'>← back home</Link><br />
				<Link className='not-found__link' to='/administration'>← back to administration</Link>
			</main>
		);
	}
}

export default PageError404;