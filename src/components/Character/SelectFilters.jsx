import React from 'react'
import { connect } from 'react-redux'
import helper from 'js-object-helper'
import { Badge, Button } from 'react-bootstrap'
import { change } from 'redux-form'
export class SelectedFilter extends React.PureComponent {
    constructor(props) {
        super(props)
        this.removeFilter = this.removeFilter.bind(this)
    }
    removeFilter(e, key) {
        e.preventDefault()
        this.props.dispatch(change('character_list_filter', key, ''))
    }
    getSelectedArr() {
        const selectedKeys = Object.keys(this.props.selectedFilters)
        return selectedKeys.map((key) => {
            return { key, value: this.props.selectedFilters[key] }
        })
    }
    render() {
        const { requesting } = this.props
        return (
            <div>
                {this.getSelectedArr().map(
                    v => 
                        <div className="selected-filter-item" key={v.value}>
                            <Button disabled={requesting} variant="primary">
                                {v.value}
                            <Badge pill variant="primary" onClick={(e) => this.removeFilter(e, v.key)}>X</Badge>
                            </Button>
                        </div>
                    )
                }
            </div>
        )
    }

}

export default connect(function (state, props) {
    return {
        ...props,
        selectedFilters: helper.getProp(state, 'form.character_list_filter.values', {}),
        requesting: helper.getProp(state, 'table.character.requesting', false)
    }
})(SelectedFilter)