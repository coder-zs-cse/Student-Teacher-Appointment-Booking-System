import {configureStore} from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { userSlice } from "./userSlice"


const rootReducer = combineReducers({
    user: userSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store