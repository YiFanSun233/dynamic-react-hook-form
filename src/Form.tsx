import React, { useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicFormProps } from "./types";
import { memo, useMemo } from "react";
import renderCore from "./RenderField";
import { get, merge, set } from "lodash-es";
import { formatSchema, transformObject } from "./utils/form";

const DynamicForm: React.FC<DynamicFormProps> = ({
	schemas,
	widgets,
	onFinished,
	config,
	form,
}) => {
	const schema = useMemo(() => formatSchema(schemas.properties), [schemas]);

	const defaultValues = useMemo(() => {
		const values: Record<string, any> = {};

		for (const key in schema) {
			const defaultValue = schema[key].defaultValue;
			if (defaultValue) {
				values[key] = defaultValue;
			}
		}
		return transformObject(values);
	}, [schema]);

	const method = useForm({
		mode: "onChange",
		...config,
		defaultValues: merge(defaultValues, config?.defaultValues || {}),
	});

	const onSubmit = useMemo(
		() =>
			method.handleSubmit(data => {
				const newData: Record<string, any> = {};
				Object.entries(schema).forEach(([key, item]) => {
					const value = get(data, key);
					if (item?.transform?.format) {
						set(newData, key, item.transform.format(value) as any);
					} else {
						set(newData, key, value);
					}
				});
				return onFinished(newData);
			}),
		[method.handleSubmit, onFinished, schema]
	);

	useImperativeHandle(form, () => ({
		submit: onSubmit,
	}));

	const renderField = useMemo(
		() => renderCore(schemas, widgets),
		[schemas, widgets]
	);

	return (
		<FormProvider {...method}>
			<form autoComplete="off">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: `repeat(${schemas.column}, minmax(0px, 1fr))`,
						gap: schemas.gap || 24,
					}}>
					{renderField}
				</div>
			</form>
		</FormProvider>
	);
};

export default memo(DynamicForm);
