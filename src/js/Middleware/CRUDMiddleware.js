export const logActionMiddleware = (state) => (next) => (action) =>{
	console.log('[Redux Action] ', action.type);
	next(action);
}