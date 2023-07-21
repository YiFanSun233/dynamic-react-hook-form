import YiForm from './Form'
import withDynamicForm from './withDynamicForm'
import { useFormValues, useYiForm, withForwardRef } from './utils/form'
import { FieldArray, NormalFieldProps, ArrayFieldProps, FormSchema, SchemaField, NormalSchema, ArraySchema } from './types'

export { useFormValues, useYiForm, withForwardRef, FieldArray }
export type { NormalFieldProps, ArrayFieldProps, FormSchema, SchemaField, NormalSchema, ArraySchema }

export default withDynamicForm(YiForm)