import { createSlice } from "@reduxjs/toolkit"


const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProducts: (state, action) => {
            state.products = [...state.products, action.payload];
        },
        clearProducts: (state) => {
            state.products = null;
        },
        editProduct: (state, action) => {
            state.products.forEach((element, index) => {
                if(element._id === action.payload._id) {
                    state.products[index] = action.payload
                }
            });
        },
        deleteProduct: (state,action) => {
            console.log(action.payload)
            state.products = state.products.filter(p => {
                return p._id !== action.payload;
            })
        }
    }
})

export const {setProducts, clearProducts, editProduct, addProducts, deleteProduct} = productsSlice.actions;
export default productsSlice.reducer;

