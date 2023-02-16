import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    userSubscribedRes: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        changeRes: (state, action) => {
            state.userSubscribedRes = action.payload
        }
    }
})

export const { reset, setUser, changeRes } = authSlice.actions
export default authSlice.reducer
