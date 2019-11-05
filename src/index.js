import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { format } from 'date-fns';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers'

window.format = format
window.React = React;

const appStore = createStore(
        appReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

window.onload = function() {
    ReactDOM.render(
        <Provider store={appStore}>
            <App /> 
        </Provider>,
        document.getElementById('root')
    );
}
