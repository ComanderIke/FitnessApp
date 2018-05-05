import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'
import './css/bootstrap.css'

const store = createStore(rootReducer)

render(
    <Provider store={store}>
        <App class=""/>
    </Provider>,
    document.getElementById('root')
);