import { WithDynamicFormProps, YiFormProps } from "./types";
import { LayoutProvider } from "./LayoutContext";

function withDynamicForm(Main: React.ComponentType<YiFormProps>) {
  return (props: WithDynamicFormProps) => {
    const { schemas, onFinished, widgets, form, config } = props
    const form_props = {
      form,
      schemas,
      widgets,
      onFinished,
      config
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