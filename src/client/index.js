import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './store/configureStore'

const store = configureStore(window.__REDUX_STATE__)

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.querySelector('.react-container')
)
