import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { format } from 'date-fns';

window.format = format

window.onload = function() {
    ReactDOM.render(<App />, document.getElementById('root'));
}
