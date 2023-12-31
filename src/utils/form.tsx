import React, { forwardRef, useRef } from "react";
import { useFormContext, useWatch, useForm, CriteriaMode, FieldValues, Resolver, ValidationMode } from "react-hook-form";
import { FormSchema, SchemaField } from "../types";

/**
 * @description: 实时获取表单数据
 * @return {*}
 */
const useFormValues = () => {
  const { getValues } = useFormContext();

  return {
    ...useWatch(), // subscribe to form value updates
    ...getValues(), // always merge with latest form values
  }
}

const useYiForm = (config: Partial<{ mode: keyof ValidationMode; reValidateMode: "onBlur" | "onChange" | "onSubmit"; defaultValues: { [x: string]: any; } | ((payload?: unknown) => Promise<FieldValues>); values: FieldValues; resetOptions: Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepTouched: boolean; keepIsValid: boolean; keepSubmitCount: boolean; }> | undefined; resolver: Resolver<FieldValues, any>; context: any; shouldFocusError: boolean; shouldUnregister: boolean; shouldUseNativeValidation: boolean; criteriaMode: CriteriaMode; delayError: number; }> | undefined) => {
  const form = useRef<{
    submit: () => void
  }>()
  const method = useForm(config)
  return {
    form,
    method
  }
}

/**
 * @description: 自定义组件时使用，绑定ref
 * @param {React} Component
 * @return {*}
 */
const withForwardRef = (Component: React.FunctionComponent<any>): React.ForwardRefExoticComponent<React.RefAttributes<unknown>> => {
  return forwardRef((props, ref) => {
    return (
      <Component {...props} ref={ref} />
    )
  })
}

/**
 * @description: 格式话form shcema
 * @param {FormSchema} schema
 * @param {*} prefix
 * @param {*} result
 * @return {*} eg:{a:{...},'a.b':{...}}
 */
const formatSchema = (schema: FormSchema['properties'], prefix: any = '', result: any = {}): Record<string, SchemaField> => {
  if (!schema) throw Error('schema 格式不正确')
  Object.entries(schema).forEach(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value.type === 'object' && Reflect.has(value, 'properties')) {
      formatSchema(value.properties, newKey, result)
    } else {
      result[newKey] = value
    }
  })
  return result
}

function flattenObject(obj: object, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};

  function traverse(obj: object, prefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const arrayKey = `${newKey}[${i}]`;
          if (typeof value[i] === 'object' && value[i] !== null) {
            traverse(value[i], arrayKey);
          } else {
            result[arrayKey] = value[i];
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  traverse(obj, prefix);
  return result;
}


export {
  useYiForm,
  useFormValues,
  withForwardRef,
  formatSchema,
  flattenObject
}