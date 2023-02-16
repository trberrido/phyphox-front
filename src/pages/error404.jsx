import React from 'react';

import {TitleLight} from '../components/title.jsx';

import './404.css';

class PageError404 extends React.Component {
	render(){
		return(
			<main className='main-content'>
				<TitleLight header='error 404' content='Page not found' />
				<a className='not-found__link' href='/'>← back home</a>
			</main>
		);
	}
}

export default PageError404;