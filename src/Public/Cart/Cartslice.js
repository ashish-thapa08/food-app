import { createSlice } from "@reduxjs/toolkit";

const userCart = createSlice({
    name: 'usercart',
    initialState: {
        cart: 0
    },
    reducers: {
        count(state, action) {
            console.log(action)
            state.cart = action.payload
        }
    }
})
export const cartAction = userCart.actions;
export default userCart;