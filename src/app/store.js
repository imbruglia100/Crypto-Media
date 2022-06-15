import { configureStore } from "@reduxjs/toolkit"
import { cryptoAPI } from "../Services/CryptoAPI";
import { cryptoNewsApi } from "../Services/CryptoNewsApi";

export default configureStore({
    reducer:{
        [cryptoAPI.reducerPath]: cryptoAPI.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    }

});