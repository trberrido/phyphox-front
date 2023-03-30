import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import router from './routes';

import './index.css';

const App = () => {
	console.log('Les dieux ne sont que des artistes. Une belle lueur sur un incendie, un beau gazon sur un champ de bataille, voilà pour eux la justice.');
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);