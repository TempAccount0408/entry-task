import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { default as App } from './Skeleton/App'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#app')
)
