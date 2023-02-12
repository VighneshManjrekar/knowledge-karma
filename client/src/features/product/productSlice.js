import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: null,
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.products = null
        },
        setProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { reset, setProducts } = productSlice.actions
export default productSlice.reducer

