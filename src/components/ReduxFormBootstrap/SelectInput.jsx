import React from 'react'
import { Form } from 'react-bootstrap'

const SelectInput = ({ input, disabled, placeholder, children }) => {

    return (
        <Form.Control disabled={disabled} type="select" as="select" placeholder={placeholder} {...input} >{children}</Form.Control>

    )
}
export default SelectInput