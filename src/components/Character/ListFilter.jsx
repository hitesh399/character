import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form } from 'react-bootstrap'
import FieldInput from '../ReduxFormBootstrap/FieldInput'
import helper from 'js-object-helper'
import { Card, Row, Col, CardColumns } from 'react-bootstrap'
import {
    setData,
    changeRequestStatus,
} from '../../actions/TableActions'

class ListFilter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { handleSubmit, requesting } = this.props
        return (
            <form onSubmit={handleSubmit} disabled>
                <CardColumns as={Row}>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} >
                        <Card className="charater-filter-card">
                            <Card.Header>Species</Card.Header>
                            <Card.Body>

                                <Form.Group controlId="species-Human">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="species"
                                        id="species-Human"
                                        label="Human" value="human"
                                        component={FieldInput}
                                        type="radio"
                                    />
                                </Form.Group>

                                <Form.Group controlId="species-Alien">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="species"
                                        id="species-Alien"
                                        label="Alien"
                                        value="Alien"
                                        component={FieldInput}
                                        type="radio" />
                                </Form.Group>
                                <Form.Group controlId="species-unknown">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="species"
                                        id="species-unknown"
                                        label="UnKnown"
                                        value="unknown"
                                        component={FieldInput}
                                        type="radio" />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} >
                        <Card>
                            <Card.Header>Status</Card.Header>
                            <Card.Body>

                                <Form.Group controlId="status-alive">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="status"
                                        id="status-alive"
                                        label="Alive"
                                        value="alive"
                                        component={FieldInput}
                                        type="radio"
                                    />
                                </Form.Group>
                                <Form.Group controlId="status-dead">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="status"
                                        id="status-dead"
                                        label="Dead"
                                        value="dead"
                                        component={FieldInput}
                                        type="radio"
                                    />
                                </Form.Group>
                                <Form.Group controlId="status-unknown">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="status"
                                        id="status-unknown"
                                        label="Unknown"
                                        value="unknown"
                                        component={FieldInput}
                                        type="radio"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12} >
                        <Card>
                            <Card.Header>Gender</Card.Header>
                            <Card.Body>

                                <Form.Group controlId="gender-Female">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="gender"
                                        id="gender-Female"
                                        label="Female"
                                        value="female"
                                        component={FieldInput}
                                        type="radio" />
                                </Form.Group>
                                <Form.Group controlId="gender-Male">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="gender"
                                        id="gender-Male"
                                        label="Male"
                                        value="male"
                                        component={FieldInput}
                                        type="radio" />
                                </Form.Group>
                                <Form.Group controlId="gender-Less">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="gender"
                                        id="gender-Less"
                                        label="Gender Less"
                                        value="genderless"
                                        component={FieldInput}
                                        type="radio" />
                                </Form.Group>
                                <Form.Group controlId="gender-unknown">
                                    <Field disabled={requesting}
                                        bootstrapComponent={Form.Check}
                                        name="gender"
                                        id="gender-unknown"
                                        label="unknown" value="unknown"
                                        component={FieldInput}
                                        type="radio"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </CardColumns>
            </form>
        )
    }
}
export default connect(function (state, props) {
    return {
        ...props,
        requesting: helper.getProp(state, 'table.character.requesting', false)
    }
})(reduxForm({
    // a unique name for the form
    form: 'character_list_filter',
    onChange: function (params, fnc, options) {
        options.dispatch(changeRequestStatus('character', true))
        window.$axios('character', { params }).then((response) => {
            options.dispatch(setData(
                'character',
                helper.getProp(response, 'results', []),
                1,
                helper.getProp(response, 'info.count', 0),
                helper.getProp(response, 'info', {}),

            ))
        }).catch(() => {
            options.dispatch(setData('character', [], 1, 0, {}))
        })
    }
})(ListFilter))