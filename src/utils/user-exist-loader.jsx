const userExistLoader = async () => {
	const doesUserExist = await fetch(
		'https://' + window.location.hostname + '/api/user/',
		{ method: 'GET' }
	)
	.then((response) => response.json())
	//.then((result) => { console.log(result); return result.status})
	return doesUserExist;
}

export default userExistLoader;