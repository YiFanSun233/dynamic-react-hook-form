import { memo } from 'react';
import FormController from "../Controller/controller";
import { FormItemProps } from "../types";
import { useFormContext } from 'react-hook-form';
import { parseAllExpression } from '../utils/expression';
import FormContent from '../FormContent';
import useLayoutContext from '../LayoutContext';

type IColumn = {
  column: number;
  gap: number;
  children: React.ReactNode;
}

const Colunm: React.FC<IColumn> = ({
  children
}) => (
  <div
    style={{
      gridArea: 'span 1 / span 1',
    }}
  >
    {children}
  </div>
)

const FormItem: React.FC<FormItemProps> = (props) => {
  const { name, schema, element } = props
  const { watch } = useFormContext()
  const { layout: { column: _column, gap: _gap } } = useLayoutContext()

  const column = schema?.column ?? _column
  const gap = schema?.gap ?? _gap

  if (!schema.dependencies) {
    return (
      <Colunm column={column} gap={gap}>
        <FormContent name={name} schema={schema}>
          <FormController name={name} schema={schema} element={element} />
        </FormContent>
      </Colunm>)
  }
  const formValues = watch(schema.dependencies)

  const parasSchema = parseAllExpression(schema, formValues)

  if (parasSchema?.hidden) {
    return null
  }

  return (
    <Colunm column={column} gap={gap}>
      <FormContent name={name} schema={parasSchema}>
        <FormController name={name} schema={parasSchema} element={element} />
      </FormContent>
    </Colunm>
  )
}

export default memo(FormItem)