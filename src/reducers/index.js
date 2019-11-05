import { combineReducers } from "redux";
import authenticationPageReducer from "./authenticationPageReducer";
import domainReducer from "./domainReducer";

const appReducer = combineReducers({
    domain: domainReducer,
    authenticationPage: authenticationPageReducer
})

export default appReducer;