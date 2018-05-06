import React from 'react'
import ReactDOM from 'react-dom';
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import rootReducer from './reducers'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
// import './css/bootstrap.css'
import './index.scss';

// const store = createStore(rootReducer)


ReactDOM.render(
        <App />,
    document.getElementById('root')
);