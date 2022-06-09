import { configureStore } from "@reduxjs/toolkit"
import { cryptoAPI } from "../Services/CryptoAPI";

export default configureStore({
    reducer:{
        [cryptoAPI.reducerPath]: cryptoAPI.reducer,
    }

});