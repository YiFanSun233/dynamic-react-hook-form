import { WithDynamicFormProps, DynamicFormProps } from "./types";
import { LayoutProvider } from "./LayoutContext";

function withDynamicForm(Main: React.ComponentType<DynamicFormProps>) {
	return (props: WithDynamicFormProps) => {
		const { schemas, onFinished, widgets, form, config } = props;
		const form_props = {
			form,
			schemas,
			widgets,
			onFinished,
			config,
		};

		return (
			<LayoutProvider
				layout={{
					column: schemas?.column ?? 1,
					gap: schemas?.gap ?? 24,
					labelSize: schemas?.labelSize ?? 14,
					layout: schemas?.layout,
					labelWidth: schemas?.labelWidth,
					wrapperWidth: schemas?.wrapperWidth,
				}}>
				<Main {...form_props} />
			</LayoutProvider>
		);
	};
}

export default withDynamicForm;
