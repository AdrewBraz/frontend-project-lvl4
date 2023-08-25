import { useFormikContext, Field } from "formik";
import React from 'react'

export default ({ ...props }) => {
    const { setFieldValue } = useFormikContext()
    const [field] = useField(props)
    const {value, ...rest} = field;
    return (
        <Field
            {...rest}
            {...props}
            onChange={(event) => {
                setFieldValue(field.name, event.currentTarget.files)
            }}
        />
    )
}