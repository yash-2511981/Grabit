import { create } from 'zustand'
import appSlices from './slices/appSlices'
import userSlices from './slices/userSlices'
import checkoutSlices from './slices/checkoutSlices'

export const useAppStore = create()((...a) => ({
    ...appSlices(...a),
    ...userSlices(...a),
    ...checkoutSlices(...a)
}))