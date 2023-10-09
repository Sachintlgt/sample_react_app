const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const URL = (uri) => `${BASE_URL}${uri}`;

/***** Auth Routes*********/
export const REGISTRATION = URL('/register');
export const USER_LOGIN = URL('/login');
export const FORGOT_PASSWORD = URL('/password/email');
export const RESET_PASSWORD = URL('/reset-password');
export const VERIFY_TOKEN = URL('/verify-email');
export const USER_LOGOUT = URL('/logout');
export const RESEND_EMAIL_VERIFICATION = URL('/resend-email-verification');
export const COUNTRY_LIST = URL('/countries');