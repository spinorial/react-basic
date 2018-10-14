export function updateCredentials(credentials){
	
	
	return {
		type: 'UPDATE_CREDENTIALS',
		payload: credentials
	}
}

export function updateUsername(username){
	

	return {
		type: 'UPDATE_USERNAME',
		payload: username
	}
}

export function updatePassword(password){

	return {
		type: 'UPDATE_PASSWORD',
		payload: password
	}
}

export function logoutUser(){
	return {
		type: 'LOGOUT'
	}
}