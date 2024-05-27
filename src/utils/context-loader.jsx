const getAuthentificationStatus = async () => {
	return fetch(window.API + '/api/user/1.json', {
		credentials: 'include',
		method: 'GET'
	})
	.then((response) => { return response.json() })
	.then(
		(result) => result,
		() => false
	)
}

const getServerAvailability = async () => {
	return fetch(window.API + '/api/', {method: 'GET'})
	.then((response) => { return response.json() })
	.then(
		(result) => result,
		() => false
	)
}

const getAppState = async () => {
	return fetch(window.API + '/api/app/state.json', {
		method: 'GET'
	})
	.then((response) => { return response.json() })
	.then(
		(result) => {
			if (result.hasOwnProperty('error'))
				return result.error;
			return result.isListening;
		},
		() => {
			return false;
		}
	)
}

const contextsLoader = async () => {
	return {
		isAppListening: await getAppState(),
		isUserAuthentificated: await getAuthentificationStatus(),
		isServerAvailable: await getServerAvailability()
	};
}

export {contextsLoader, getAppState, getAuthentificationStatus, getServerAvailability};