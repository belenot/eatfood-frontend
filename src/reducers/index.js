import { combineReducers } from "redux";
import authenticationPageReducer from "./authenticationPageReducer";
import domainReducer from "./domainReducer";
import mainPageReducer from "./mainPageReducer";

const appReducer = combineReducers({
    domain: domainReducer,
    authenticationPage: authenticationPageReducer,
    mainPage: mainPageReducer
})

export default appReducer;