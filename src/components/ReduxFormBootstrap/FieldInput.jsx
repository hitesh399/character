import React from 'react'

const FieldInput = ({ input, meta, type, placeholder, min, max, bootstrapComponent, label, disabled }) => {
    return (
        React.createElement(bootstrapComponent, {
            type,
            placeholder,
            min,
            max,
            label,
            disabled,
            ...input,
        })
    )
}
export default FieldInput