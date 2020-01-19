import React from 'react'
import { Field, reduxForm } from 'redux-form'
import SelectInput from '../ReduxFormBootstrap/SelectInput'
import { connect } from 'react-redux'
import helper from 'js-object-helper'
import { Row, Col } from 'react-bootstrap'

class ListSort extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { handleSubmit, requesting } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xl={{ span: 4, offset: 8 }} lg={{ span: 4, offset: 8 }} md={{ span: 8, offset: 4 }} sm={{ span: 5, offset: 7 }} xs={{ span: 12}}>
                        <Field
                            disabled={requesting}
                            name="sort_by_id" placeholder="Sort By ID" component={SelectInput} type="select" >
                            <option value="">Sort By ID</option>
                            <option value="asc"> Ascending</option>
                            <option value="desc">Descending</option>
                        </Field>
                    </Col>
                </Row>
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
})(ListSort))