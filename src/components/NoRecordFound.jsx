import React from 'react'
import { connect } from 'react-redux'
import Animated from './Animated'
import { Row, Col , Alert} from 'react-bootstrap'
import helper from 'js-object-helper'

export class NoRecordFound extends React.PureComponent {

    render() {
        const { dataSize, requesting } = this.props
        return !dataSize && !requesting ?
            (<Animated bottom>
                <Row>
                    <Col><Alert variant="danger">No Record Found</Alert></Col>
                </Row>
            </Animated>) : null


    }

}

export default connect(function (state, props) {
    const data = helper.getProp(state, ['table', props.name, 'data'], [])
    return {
        ...props,
        dataSize: data ? data.length : 0,
        requesting: helper.getProp(state, ['table', props.name, 'requesting'], true)
    }
})(NoRecordFound)