import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import './header.css';

import { AuthentificationContext } from '../context.jsx';
import { Menu, Burger } from './menu.jsx';
import { ButtonPrivate } from './button.jsx';

const Header = () => {

	const setIsAuthentificated = useContext(AuthentificationContext).setIsUserAuthentificated;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	let navigate = useNavigate();

	const handleBurgerClick = () => {
		setIsMenuOpen(!isMenuOpen);
	}

	const handleLinkClick = (e) => {
		setIsMenuOpen(false);
	}

	const handleLogOutButton = () => {

		fetch(window.BASE + '/api/user/', {
			method: 'PUT',
			credentials: 'include'
		})
		.then(() => {
			setIsAuthentificated(false);
			navigate('/', { replace: true });
		})
	}

	return (
		<div className='header__container'>
			<header className='header'>
				<div>
					<Burger isMenuOpen={isMenuOpen} onBurgerClick={handleBurgerClick} />
					<h1 className='header__title'>
						<Link onClick={() => {setIsMenuOpen(false)}} className='header__link' to='/'>Data<span className="header__link--highlight">.Viz</span></Link>
					</h1>
				</div>
				<ButtonPrivate type='important' text='Log out' handleClick={handleLogOutButton} buttonClassName='header__button-logout' />
			</header>
			<Menu isMenuOpen={isMenuOpen} onLinkClick={handleLinkClick} />
		</div>
	);
	
}

export default Header;