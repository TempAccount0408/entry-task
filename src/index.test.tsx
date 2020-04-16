import * as Enzyme from 'enzyme'
import * as React from 'react'
import * as Adapter from 'enzyme-adapter-react-16'
import { default as App } from './Skeleton/App'
import { HashRouter as Router } from 'react-router-dom'

const { shallow, render, mount } = Enzyme

Enzyme.configure({ adapter: new Adapter() })

test('case: expect the app can render with router', () => {
    expect(() =>
        shallow(
            <Router>
                <App />
            </Router>
        )
    ).not.toThrow()
})

test('case: expect the app will fail without router', () => {
    expect(() => shallow(<App />)).toThrow()
})
