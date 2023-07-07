import React, { useImperativeHandle } from "react";
import { FormProvider } from "react-hook-form";
import { YiFormProps } from "./types";
import { memo, useMemo } from "react";
import renderCore from "./RenderField";
import { LayoutProvider } from "./LayoutContext";
import { get, set } from "lodash-es";
import { formatSchema } from "./utils/form";

const YiForm: React.FC<YiFormProps> = ({ schemas, widgets, onFinished, form, method }) => {

  const { handleSubmit } = method

  const onSubmit = useMemo(() => handleSubmit(data => {
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
  }), [handleSubmit, onFinished, schemas])

  useImperativeHandle(
    form,
    () => ({
      ...method,
      submit: onSubmit
    })
  )

  const renderField = useMemo(() => renderCore(schemas, widgets), [schemas, widgets])

  return (
    <LayoutProvider layout={{
      column: schemas.column || 1,
      gap: schemas.gap || 24
    }}>
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
    </LayoutProvider>
  )
}

export default memo(YiForm)