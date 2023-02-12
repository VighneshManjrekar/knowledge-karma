import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
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
        }
    }
})

export const { reset, setUser } = authSlice.actions
export default authSlice.reducer
