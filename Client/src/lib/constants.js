export const HOST = import.meta.env.VITE_SERVER_URL

const AUTH_ROUTES = `${HOST}/ots/user`
export const SIGN_IN = `${AUTH_ROUTES}/signIn`
export const SIGN_UP = `${AUTH_ROUTES}/signUp`
export const SIGN_OUT = `${AUTH_ROUTES}/signOut`


export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`
export const GET_CART_ITEMS = `${AUTH_ROUTES}/get-cart-items`
export const GET_PRODUCTS = `${AUTH_ROUTES}/get-products`
export const GET_RESTAURANTS = `${AUTH_ROUTES}/get-restaurants`
export const GET_DISPLAY_ITEMS = `${AUTH_ROUTES}/get-displayItems`

export const ADD_TO_CART = `${AUTH_ROUTES}/add-to-cart`
export const REMOVE_FROM_CART = `${AUTH_ROUTES}/delete-cart-item`
export const UPDATE_CART = `${AUTH_ROUTES}/update-cart`


export const UPDATE_PERSONAL_INFO = `${AUTH_ROUTES}/update-info`
export const CHANGE_PASSWORD = `${AUTH_ROUTES}/change-password`
export const ADD_ADDRESS = `${AUTH_ROUTES}/add-address`