import YiForm from './Form'
import withDynamicForm from './withDynamicForm'
import { useFormValues, useDynamicForm, withForwardRef } from './utils/form'
import { FieldArray, NormalFieldProps, ArrayFieldProps, FormSchema, SchemaField, NormalSchema, ArraySchema } from './types'
import { useFormContext, useFormState, useWatch, useForm } from 'react-hook-form'

export { useFormContext, useFormState, useWatch, useForm, useFormValues, useDynamicForm, withForwardRef }
export type { NormalFieldProps, ArrayFieldProps, FormSchema, SchemaField, NormalSchema, ArraySchema, FieldArray }

export default withDynamicForm(YiForm)