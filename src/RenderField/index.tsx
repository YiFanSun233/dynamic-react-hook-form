import React from "react";
import FormItem from "../FormItem";
import { FormSchema, SchemaField, Widgets } from "../types";
import { isEmpty } from "lodash-es";
import { formatSchema } from "../utils/form";

const renderField = (dataIndex: string, fieldSchema: SchemaField, widgets: Widgets): React.ReactNode => {
  const Element = widgets[fieldSchema?.component!]
  return <FormItem key={dataIndex} name={dataIndex} schema={fieldSchema} element={<Element />} />
}

const renderCore = (schema: FormSchema, widgets: Widgets, parentKey?: string): React.ReactNode => {
  if (!schema || isEmpty(schema)) {
    return null
  }
  const formSchema = formatSchema(schema.properties)
  return Object.entries(formSchema).map(([key, item]) => renderField(key, item, widgets))
}

export default renderCore