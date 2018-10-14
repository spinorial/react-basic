export const BASE_URL = 'https://guidelines.joe:8890';
export const AUTHENTICATION_URL = BASE_URL + '/wp-json/login/auth';
export const GUIDELINES_URL = BASE_URL + '/wp-json/guideline/filter/title=notitle';
export const GUIDELINE_URL = BASE_URL + '/wp-json/wp/v2/guideline/'; //Add id to this to get guideline
export const WPJSON_URL = BASE_URL + '/wp-json/';
export const GUIDLINE_BY_LETTER_URL = BASE_URL +'/wp-json/guideline/filter/select='; //Add letter to this to get guideline
export const LEAD_AUTHOR_GUIDELINES_URL = (firstname, surname) =>{
	var result = WPJSON_URL  + 'guideline/author/firstname='+firstname + '/surname='+surname;
	return result;
}
export const REACT_URL = 'http://127.0.0.1:8080/#/';
export const REACT_EDITOR_URL = 'http://127.0.0.1:8080/#/editor';



