import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const AuthentificationContext = React.createContext(null);
const AppStateContext = React.createContext(null);

const ContextsProvider = (props) => {

	const contextValues = useLoaderData();

	const [isUserAuthentificated, setIsUserAuthentificated] = useState(contextValues.isUserAuthentificated);
	const [isAppListening, setIsAppListening] = useState(contextValues.isAppListening);

	return (
		<AuthentificationContext.Provider value={{isUserAuthentificated, setIsUserAuthentificated}} >
			<AppStateContext.Provider value={{isAppListening, setIsAppListening}}>
				{props.children}
			</AppStateContext.Provider>
		</AuthentificationContext.Provider>
	);

}

export {AuthentificationContext, AppStateContext, ContextsProvider};