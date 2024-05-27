import React, { Suspense, useContext } from 'react';
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";
import Loader from './loader.jsx';
import Message from './message.jsx';

import {ContextsProvider, ServerAvaibilityContext} from '../context.jsx';

import './layout.css';

const CheckServerAvaibility = ({ children }) => {
	const isServerAvailable = useContext(ServerAvaibilityContext).isServerAvailable;
	if (isServerAvailable === null)
		return <Loader />
	if (isServerAvailable.hasOwnProperty('error'))
		return <Message type='error' message={isServerAvailable.error} />
	return children;
}

const Layout = () => {

	return (

		<ContextsProvider >

			<Header />
				<main className='main-content'>
					<Suspense fallback={<Loader />}>
						<CheckServerAvaibility>
							<Outlet />
						</CheckServerAvaibility>
					</Suspense>
				</main>
			<Footer />

		</ContextsProvider>

	);

}

export default Layout;