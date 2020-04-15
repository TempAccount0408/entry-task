import 'antd/dist/antd.css'
import 'normalize.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { App } from './app'
import './index.css'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#app')
)
