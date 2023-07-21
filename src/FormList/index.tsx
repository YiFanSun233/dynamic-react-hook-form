import { memo, useEffect } from "react";
import { ArraySchema, Widgets } from "../types";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormContent from "../FormContent";
import FormController from "../Controller";
import useLayoutContext from "../LayoutContext";

interface IFormList {
  name: string;
  schema: ArraySchema;
  widgets: Widgets;
}

const FormList: React.FC<IFormList> = ({ name, schema, widgets }) => {
  const { control, unregister } = useFormContext()
  const { layout } = useLayoutContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: schema.rules
  })

  /**
 * @description: 字段隐藏时从表单中注销
 * @return {*}
 */
  useEffect(() => {
    return () => {
      unregister(name)
    }
  }, [unregister])

  return (
    <>
      <FormContent layout={{ ...layout, wrapperWidth: '100%' }} name={name} schema={schema}>
        <div>
          {
            fields.map((field, index) => {
              return <div key={field.id} style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                {
                  Object.entries(schema.item.properties).map(([key, value]) => {
                    const Element = widgets[value.component!]
                    return (
                      <FormContent key={`${name}.${index}.${key}`} layout={{ layout: 'horizontal' }} name={`${name}.${index}.${key}`} schema={value}>
                        <FormController name={`${name}.${index}.${key}`} schema={value} element={<Element />} />
                      </FormContent>
                    )
                  })
                }
                <span style={{ display: 'inline-block', height: 32, lineHeight: '32px', fontSize: 12, color: '#1677ff' }} onClick={() => remove(index)}>删除</span>
              </div>
            })
          }
          <div style={{ marginTop: 20 }}>
            <div style={{ border: '1px dashed #d9d9d9', textAlign: 'center', height: 32, lineHeight: '32px', fontSize: 12, cursor: 'pointer' }} onClick={() => append({})}>新增一条</div>
          </div>
        </div>
      </FormContent>
    </>
  )
}

export default memo(FormList)