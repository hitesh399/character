import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import helper from 'js-object-helper'

import {
    setData,
    pushData,
    changeRequestStatus,
    setPrimaryKey
} from '../actions/TableActions'

export class List extends React.Component {

    constructor(props) {
        super(props)
        this.setData = this.setData.bind(this)
        this.pushData = this.pushData.bind(this)
        this.setRequestStatus = this.setRequestStatus.bind(this)
    }
    componentDidMount() {
        const { dispatch, name, primaryKey } = this.props
        dispatch(setPrimaryKey(name, primaryKey ? primaryKey : 'id'))
    }
    setData(data, page, total, info ={}) {
        this.props.dispatch(setData(this.props.name, data, page, total, info))
    }
    pushData(data, page, total, info ={}) {
        this.props.dispatch(pushData(this.props.name, data, page, total, info))
    }
    setRequestStatus(status) {
        this.props.dispatch(changeRequestStatus(this.props.name, status))
    }
    shouldComponentUpdate(nextProps) {
        return this.props.shouldUpdate !== nextProps.shouldUpdate
    }
    render() {
        return React.createElement(this.props.component, {
            setData: this.setData,
            pushData: this.pushData,
            setRequestStatus: this.setRequestStatus,
            ...this.props
        })
    }
}

List.propTypes = {
    name: PropTypes.string,
    component: PropTypes.elementType,
    primaryKey: PropTypes.string
}

export default connect(function (state, props) {
    return {
        ...props,
        ...helper.getProp(state, ['table', props.name], {})
    }
})(List)