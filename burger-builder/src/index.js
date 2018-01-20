import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'https://burger-builder-70d11.firebaseio.com/'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
