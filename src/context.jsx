import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const AuthentificationContext = React.createContext(null);
const AppStateContext = React.createContext(null);
const ServerAvaibilityContext = React.createContext(null);

const ContextsProvider = (props) => {

	const contextValues = useLoaderData();

	const [isServerAvailable, setIsServerAvailable] = useState(contextValues.isServerAvailable);
	const [isUserAuthentificated, setIsUserAuthentificated] = useState(contextValues.isUserAuthentificated);
	const [isAppListening, setIsAppListening] = useState(contextValues.isAppListening);

	return (
		<ServerAvaibilityContext.Provider value={{isServerAvailable, setIsServerAvailable}}>
			<AuthentificationContext.Provider value={{isUserAuthentificated, setIsUserAuthentificated}} >
				<AppStateContext.Provider value={{isAppListening, setIsAppListening}}>
					{props.children}
				</AppStateContext.Provider>
			</AuthentificationContext.Provider>
		</ServerAvaibilityContext.Provider>
	);

}

export {ServerAvaibilityContext, AuthentificationContext, AppStateContext, ContextsProvider};