import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.interceptors.request.use(conf => {
  console.log(conf)
  return conf
}, err => {
  console.log(err)
  return Promise.reject(err)
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
