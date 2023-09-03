import React, { lazy, useContext } from 'react';
import {
	createBrowserRouter,
	Navigate
} from "react-router-dom";

import { contextsLoader } from './utils/context-loader';
import Layout from './components/layout.jsx';
import { configurationLoader, configurationDefault } from './utils/configuration-loader.jsx';
import userExistLoader from './utils/user-exist-loader.jsx';

import { AuthentificationContext, AppStateContext } from './context';
import Loader from './components/loader';

const PageHome = lazy(() => import('./pages/home.jsx'));
const PagePreviousXPs = lazy(() => import('./pages/previous_xp.jsx'));
const PageExperiment = lazy(() => import('./pages/experiment.jsx'));
const PageAdministration = lazy(() => import('./pages/administration.jsx'));
const PageError404 = lazy(() => import('./pages/error404.jsx'));
const PageLogin = lazy(() => import('./pages/login.jsx'));
const PageConfigurationCreate = lazy(() => import('./pages/configuration-create.jsx'));
const PageConfigurationEdit = lazy(() => import('./pages/configuration-edit'));

const ProtectedAuth = ({ children })  => {
	const isUserAuthentificated = useContext(AuthentificationContext).isUserAuthentificated;
	if (isUserAuthentificated === null)
		return <Loader />
	if (isUserAuthentificated === true)
		return children;
	return <Navigate to="/login" replace />;
}

const ProtectedAppListening = ({ children }) => {
	const isAppListening = useContext(AppStateContext).isAppListening;
	if (isAppListening)
		return <Navigate to="/administration" replace />;
	return children;
}

const router = createBrowserRouter([
	{
		path: '/',
		loader: contextsLoader,
		element: <Layout /> ,
		errorElement: <PageError404 />,
		children: [
			{path: '', element: <PageHome />},
			{path: 'experiment', element: <PagePreviousXPs />},
			{path: 'login',
				loader: userExistLoader,
				element: <PageLogin />},
			{path: 'experiment/:experimentID',
				element: <PageExperiment />},
			{path: 'administration', element: <ProtectedAuth><PageAdministration /></ProtectedAuth>},
			{path: 'administration/create_configuration',
				loader: configurationDefault,
				element: <ProtectedAuth><ProtectedAppListening><PageConfigurationCreate /></ProtectedAppListening></ProtectedAuth>},
			{path: 'administration/edit_configuration/:configurationID',
				loader: configurationLoader,
				element: <ProtectedAuth><ProtectedAppListening><PageConfigurationEdit /></ProtectedAppListening></ProtectedAuth>
			}
		]
	}
], { basename: window.SUBDIR });

export default router;
