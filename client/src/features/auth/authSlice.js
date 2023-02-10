import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.user = null
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(register.pending, (state) => {
    //             state.isLoading = true
    //         })
    //         .addCase(register.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.user = action.payload
    //         })
    //         .addCase(register.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.message = action.payload
    //             state.user = null
    //         })
    //         .addCase(login.pending, (state) => {
    //             state.isLoading = true
    //         })
    //         .addCase(login.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.user = action.payload
    //         })
    //         .addCase(login.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.message = action.payload
    //             state.user = null
    //         })
    //         .addCase(logout.fulfilled, (state) => {
    //             state.user = null
    //         })
    // },
})

export const { reset, setUser } = authSlice.actions
export default authSlice.reducer
