export const HOST = import.meta.env.VITE_SERVER_URL

const AUTH_ROUTES = `${HOST}/ots/user`
export const SIGN_IN_ROUTE = `${AUTH_ROUTES}/signIn`
export const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signUp`