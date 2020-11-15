import React from 'react'
      import ReactDOM from 'react-dom'
      import './index.css'
      import App from './App'
      import { BrowserRouter as Router } from 'react-router-dom'
      import { ElefantProvider } from 'elefant'
      
      require('dotenv').config()

      export const initialState = {}
      export const reducer = (state, action) => {
        switch (action.type) {
          case 'default':
            return state
          default:
            return state
        }
      }
      
      ReactDOM.render(
        <Router>
          <ElefantProvider reducer={reducer} initialState={initialState}>
            <App />
          </ElefantProvider>
        </Router>,
        document.getElementById('root'),
      )