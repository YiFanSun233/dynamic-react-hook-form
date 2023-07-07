import { WithDynamicFormProps, YiFormProps } from "./types";
import { LayoutProvider } from "./LayoutContext";

function withDynamicForm(Main: React.ComponentType<YiFormProps>) {
  return (props: WithDynamicFormProps) => {
    const { schemas, onFinished, widgets, form, method } = props
    const form_props = {
      form,
      method,
      schemas,
      widgets,
      onFinished
    }

    return (
      <LayoutProvider layout={{
        column: Math.floor(24 / (schemas.column || 1)),
        gap: schemas.gap || 24
      }}>
        <Main {...form_props} />
      </LayoutProvider>
    )
  }
}

export default withDynamicForm