import { configureStore } from "@reduxjs/toolkit";
import userAuth from "../Authentication/Loginsession/Loginslice";
import userCart from "../Public/Cart/Cartslice";
const store = configureStore({
    reducer: { auth: userAuth.reducer, cart: userCart.reducer }
})
export default store