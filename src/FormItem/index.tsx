import { memo } from 'react';
import FormController from "../Controller";
import { FormItemProps } from "../types";
import FormContent from '../FormContent';
import useLayoutContext from '../LayoutContext';
import MessageBox from '../MessageBox';

const FormItem: React.FC<FormItemProps> = (props) => {
  const { name, schema, element } = props
  const { layout } = useLayoutContext()

  return (
    <FormContent layout={layout} name={name} schema={schema}>
      <FormController name={name} schema={schema} element={element} />
      <MessageBox name={name} helpText={schema?.helpText} />
    </FormContent>
  )
}

export default memo(FormItem)