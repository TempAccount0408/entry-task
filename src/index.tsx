import 'normalize.css'
import 'antd/dist/antd.css'
import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './app'

const insert_point = document.querySelector('#app')

ReactDOM.render(<App />, insert_point)
