import React from 'react';
import {ButtonStopListening} from './button.jsx';
import {Link} from 'react-router-dom';

import './menu.css';

class Burger extends React.Component {
	constructor(props){
		super(props);
		this.click = this.click.bind(this);
	}
	click(e){
		this.props.onBurgerClick()
	}
	render (){
		return (
			<div
			className={'burger ' + (this.props.isMenuOpen ? 'burger--menu-open' : 'burger--menu-close')}
			onClick={this.click} >
				<div className='burger__slice'></div>
				<div className='burger__slice'></div>
				<div className='burger__slice'></div>
				<div className='burger__slice'></div>
			</div>
		);
	}
}

const Menu = (props) => {

	const menuElements = [
		{name: "Previous experiments", url: "/previous"},
		{name: "Administration", url: "/administration"}
	];

	return (

		<div onClick={props.onLinkClick}
			className={'menu-container ' + (props.isMenuOpen ? 'menu-container--open' : 'menu-container--closed') } >
			<div className='menu-background'>
			<nav>
				<ul className='menu'>
				{menuElements.map(element => (
					<li className='menu__item' key={element.name}>
						<Link onClick={props.onLinkClick} className='menu__link' to={element.url}>{element.name}</Link>
					</li>
				))}
				</ul>
			</nav>
			<ButtonStopListening handleClick={props.onLinkClick} lightBackground={true} />
			</div>
		</div>
	
	);
	
}

export { Burger, Menu };