import React from 'react'
import ReactDOM from 'react-dom'
import { ElefantProvider } from 'elefant-state'

import './index.css'
import { App } from './App'
import { initialState, reducer } from './State'

require('dotenv').config()

ReactDOM.render(
  <ElefantProvider reducer={reducer} initialState={initialState}>
    <App />
  </ElefantProvider>,
  document.getElementById('root'),
)
