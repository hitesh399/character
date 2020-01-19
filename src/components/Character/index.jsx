import React from 'react'
import List from '../List'
import { Row, Col } from 'react-bootstrap'
import ListFilter from './ListFilter'
import CharacterList from './List'
import SelectedFilter from './SelectFilters'


export default class Character extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Row>
                <Col xl={3} lg={3} md={3} xs={12} >
                    <h2>Filters</h2>
                    <ListFilter />
                </Col>
                <Col xl={9} lg={9} md={9} xs={12} >
                    <Row className="m-b-10">
                        <Col><SelectedFilter /></Col>
                    </Row>
                    
                    <List name="character" component={CharacterList} />
                </Col>
            </Row>
        )
    }
}