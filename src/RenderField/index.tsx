import React from "react";
import { FormSchema, SchemaField, Widgets } from "../types";
import { isEmpty } from "lodash-es";
import { formatSchema } from "../utils/form";
import Wrapper from "../Wrapper";

const renderField = (dataIndex: string, fieldSchema: SchemaField, widgets: Widgets): React.ReactNode => {
  return <Wrapper key={dataIndex} name={dataIndex} schema={fieldSchema} widgets={widgets} />
}

const renderCore = (schema: FormSchema, widgets: Widgets): React.ReactNode => {
  if (!schema || isEmpty(schema)) {
    return null
  }
  const formSchema = formatSchema(schema.properties)
  return Object.entries(formSchema).map(([key, item]) => renderField(key, item, widgets))
}

export default renderCore