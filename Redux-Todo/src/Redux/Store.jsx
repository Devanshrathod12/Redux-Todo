import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./ReduxSlice"

const store = configureStore({
    reducer:{
        users:userReducer
    }
})

export default store;