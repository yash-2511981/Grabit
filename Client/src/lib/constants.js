export const HOST = import.meta.env.VITE_SERVER_URL

const AUTH_ROUTES = `${HOST}/ots/user`
export const SIGN_IN = `${AUTH_ROUTES}/signIn`
export const SIGN_UP = `${AUTH_ROUTES}/signUp`
export const SIGN_OUT = `${AUTH_ROUTES}/signOut`
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`