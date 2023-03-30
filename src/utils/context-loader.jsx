const getAuthentificationStatus = async () => {
	return fetch(window.BASE + '/api/user/1.json', {
		credentials: 'include',
		method: 'GET'
	})
	.then((response) => { return response.json() })
	.then(
		(result) => { 
			return result
		},
		() => { return false }
	)
}

const getAppState = () => {
	return fetch(window.BASE + '/api/app/state.json', {
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
		isUserAuthentificated: await getAuthentificationStatus()
	};
}

export {contextsLoader, getAppState, getAuthentificationStatus};