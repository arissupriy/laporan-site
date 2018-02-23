const API_HOST = 'https://apiku.smasayk.tk/api/v1';
export const IMAGE_URL = 'https://apiku.smasayk.tk';

export default API_HOST;

export const API_LOGIN = API_HOST+'/auth/login';
export const API_LOGOUT = API_HOST+'/auth/logout';
export const API_REGISTER = API_HOST+'/auth/register';
export const API_PROFILE = API_HOST+'/auth/profile';

export const COMPLAINT_CREATE = API_HOST+'/complaint/create';
export const COMPLAINT_DATA = API_HOST+'/complaint-all';
export const COMPLAINT_BY_ID = API_HOST+'/complaint';
export const COMPLAINT_BY_CATEGORY = API_HOST+'/complaint';

export const COMPLAINT_CATEGORY = API_HOST+'/complaint-category';

export const COMPLAINT_COMMENT = API_HOST+'/complaint-comment';
export const COMPLAINT_COMMENT_CREATE = API_HOST+'/complaint-comment/create';
export const COMPLAINT_COMMENT_DELETE = API_HOST+'/complaint-comment/delete';
