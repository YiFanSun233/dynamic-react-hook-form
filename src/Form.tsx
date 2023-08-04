import React, { useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicFormProps } from "./types";
import { memo, useMemo } from "react";
import renderCore from "./RenderField";
import { get, set } from "lodash-es";
import { formatSchema } from "./utils/form";

const DynamicForm: React.FC<DynamicFormProps> = ({ schemas, widgets, onFinished, config, form }) => {

  const method = useForm({
    mode: 'onChange',
    ...config
  })

  const onSubmit = useMemo(() => method.handleSubmit(data => {
    const newData: Record<string, any> = {}
    const schema = formatSchema(schemas.properties)
    Object.entries(schema).forEach(([key, item]) => {
      const value = get(data, key)
      if (item?.transform?.format) {
        set(newData, key, item.transform.format(value) as any)
      } else {
        set(newData, key, value)
      }
    })
    return onFinished(newData)
  }), [method.handleSubmit, onFinished, schemas])

  useImperativeHandle(
    form,
    () => ({
      submit: onSubmit
    })
  )

  const renderField = useMemo(() => renderCore(schemas, widgets), [schemas, widgets])

  return (
    <FormProvider {...method}>
      <form autoComplete="off">
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${schemas.column}, minmax(0px, 1fr))`,
          gap: schemas.gap || 24
        }}>
          {renderField}
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(DynamicForm)