import React, { memo, useCallback, useEffect } from 'react';
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn, useFormContext } from 'react-hook-form';
import { ControllerProps, SchemaCommon } from '../types';
import { isString } from 'lodash-es';

const newOnChange = (schema: SchemaCommon, onChange: (...event: any[]) => void, event: any[]) => {
  if (schema?.transform?.output) {
    return onChange(schema.transform.output(event))
  }
  return onChange(event)
}

const newValue = (schema: SchemaCommon, value: any) => {
  if (schema?.transform?.input) {
    return schema.transform.input(value || '')
  }
  return value
}

const FormController: React.FC<ControllerProps> = ({ name, schema, element }) => {
  const { control, unregister } = useFormContext()

  /**
   * @description: 字段隐藏时从表单中注销
   * @return {*}
   */
  useEffect(() => {
    return () => {
      unregister(name)
    }
  }, [unregister])

  /**
   * @description: 字段渲染，将schema和controller的field添加到属性
   * @param {*} useCallback
   * @return {*}
   */
  const renderChild = useCallback((field: ControllerRenderProps<FieldValues, string>) => {
    const _selfProps = schema?.selfProps ?? {}
    const _field = { ...field, onChange: (e: any) => newOnChange(schema, field.onChange, e), value: newValue(schema, field.value) }
    return React.cloneElement(element, { ..._selfProps, ..._field })
  }, [element, schema])

  /**
   * @description: controller render
   * @param {*} useCallback
   * @return {*} React.ReactElement
   */
  const fieldRender = useCallback(({ field }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => renderChild(field), [renderChild])

  /**
   * @description: 将required加到rules
   * @return {*}
   */
  const rules = {
    ...schema.rules,
    required: {
      value: schema.required,
      message: isString(schema.required) ? schema.required : '此项为必填项'
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={fieldRender}
    />
  )
}

export default memo(FormController)