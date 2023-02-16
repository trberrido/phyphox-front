import React, { Suspense } from 'react';
import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";
import Loader from './loader.jsx';

import {ContextsProvider} from '../context.jsx';

import './layout.css';

const Layout = () => {

	return (

		<ContextsProvider >

			<Header />
				<main className='main-content'>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</main>
			<Footer />

		</ContextsProvider>

	);

}

export default Layout;