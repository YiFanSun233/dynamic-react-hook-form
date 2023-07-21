import React, { memo, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import useLayoutContext from "../LayoutContext"
import { SchemaField, Widgets } from "../types";
import FormList from "../FormList";
import FormItem from "../FormItem";
import { parseAllExpression } from "../utils/expression";

interface IWrapper {
  name: string;
  schema: SchemaField;
  widgets: Widgets;
}

type IColumn = {
  column: number;
  gap: number;
  children: React.ReactNode;
}

const Colunm: React.FC<IColumn> = memo(({
  column,
  gap,
  children
}) => (
  <div
    style={{
      gridColumn: `span ${column} / auto`,
    }}
  >
    {children}
  </div>
))

const Field: React.FC<{ name: string; schema: SchemaField, widgets: Widgets }> = memo(({ name, schema, widgets }) => {
  const { layout: { column: _column, gap: _gap } } = useLayoutContext()

  const column = schema?.column ?? _column
  const gap = schema?.gap ?? _gap

  if (schema.type === 'array') {
    return (
      // FormList 默认占据一行
      <Colunm column={_column} gap={gap}>
        <FormList name={name} schema={schema} widgets={widgets} />
      </Colunm>
    )
  }
  const Element = widgets[schema?.component!]
  return (
    <Colunm column={column} gap={gap}>
      <FormItem key={name} name={name} schema={schema} element={<Element />} />
    </Colunm>
  )
})

/**
 * 表达式判断字段组件的显示与隐藏
 **/
const Wrapper: React.FC<IWrapper> = (props) => {
  const { name, schema, widgets } = props
  const { watch } = useFormContext()

  if (!schema?.dependencies) {
    return (
      <Field name={name} schema={schema} widgets={widgets} />
    )
  }

  const formValues = watch(schema.dependencies)

  const parasSchema = useMemo(() => parseAllExpression(schema, formValues), [schema, formValues])

  if (parasSchema?.hidden) {
    return null
  }

  return (
    <Field name={name} schema={parasSchema} widgets={widgets} />
  )
}

export default memo(Wrapper)