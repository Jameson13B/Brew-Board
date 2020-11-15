import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ElefantProvider } from 'elefant-state'

import './index.css'
import { App } from './App'
import { initialState, reducer } from './State'

require('dotenv').config()

ReactDOM.render(
  <Router>
    <ElefantProvider reducer={reducer} initialState={initialState}>
      <App />
    </ElefantProvider>
  </Router>,
  document.getElementById('root'),
)
