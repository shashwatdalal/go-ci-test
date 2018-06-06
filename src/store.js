import {createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"

const initialState = {};

const middleware = [thunk]

//createStore(reducer, [preloadedState], [enhancer])
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;