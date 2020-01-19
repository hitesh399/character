import React from 'react'

import { Provider } from 'react-redux'
import store from './store'
import Character from './components/Character'
import { Container } from 'react-bootstrap'

export default class App extends React.PureComponent {

    render() {
        return (
            <Provider store={store}>
                <Container>
                    <Character />
                </Container>
            </Provider>
        )
    }
}