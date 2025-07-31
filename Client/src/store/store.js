import { create } from 'zustand'
import appSlices from './slices/appSlices'
import userSlices from './slices/userSlices'

export const useAppStore = create()((...a) => ({
    ...appSlices(...a),
    ...userSlices(...a)
}))