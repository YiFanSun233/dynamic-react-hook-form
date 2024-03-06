import React, { forwardRef, useRef } from "react";
import {
	FieldValues,
	UseFormReturn,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { FormSchema, SchemaField } from "../types";
import validateFormats, { RulesType } from "./validate.formats";
import { isObjectLike, isString } from "lodash-es";

/**
 * @description: 实时获取表单数据
 * @return {*}
 */
const useFormValues = (): any => {
	const { getValues } = useFormContext();

	return {
		...useWatch(), // subscribe to form value updates
		...getValues(), // always merge with latest form values
	};
};

const useDynamicForm = () => {
	const form = useRef<
		UseFormReturn<FieldValues, any, undefined> & {
			submit: () => void;
		}
	>();

	return {
		form,
	};
};

/**
 * @description: 自定义组件时使用，绑定ref
 * @param {React} Component
 * @return {*}
 */
const withForwardRef = (
	Component: React.ElementType<any>
): React.ForwardRefExoticComponent<React.RefAttributes<unknown>> => {
	return forwardRef((props, ref) => {
		return (
			<Component
				{...props}
				ref={ref}
			/>
		);
	});
};

/**
 * @description: 格式话form shcema
 * @param {FormSchema} schema
 * @param {*} prefix
 * @param {*} result
 * @return {*} eg:{a:{...},'a.b':{...}}
 */
const formatSchema = (
	schema: FormSchema["properties"],
	prefix: any = "",
	result: any = {}
): Record<string, SchemaField & { deep?: number }> => {
	if (!schema) throw Error("schema 格式不正确");
	Object.entries(schema).forEach(([key, value], index) => {
		const newKey = prefix ? `${prefix}.${key}` : key;
		if (value.type === "object" && Reflect.has(value, "properties")) {
			formatSchema(value.properties, newKey, result);
		} else {
			result[newKey] = value;
			result[newKey]["deep"] = index++;
		}
	});
	return result;
};

/**
 *
 * @param object inputObj {'a.b.c':'value'}
 * @returns object {a:{b:{c:'value'}}}
 */
function transformObject(inputObj: Record<string, any>) {
	return Object.entries(inputObj).reduce((acc, [key, value]) => {
		key.split(".").reduce((obj, prop, index, arr) => {
			return (obj[prop] = index === arr.length - 1 ? value : obj[prop]! || {});
		}, acc);
		return acc;
	}, {} as Record<string, any>);
}

function flattenObject(obj: object, prefix = ""): Record<string, any> {
	const result: Record<string, any> = {};

	function traverse(obj: object, prefix: string) {
		for (const [key, value] of Object.entries(obj)) {
			const newKey = prefix ? `${prefix}.${key}` : key;

			if (Array.isArray(value)) {
				for (let i = 0; i < value.length; i++) {
					const arrayKey = `${newKey}[${i}]`;
					if (typeof value[i] === "object" && value[i] !== null) {
						traverse(value[i], arrayKey);
					} else {
						result[arrayKey] = value[i];
					}
				}
			} else if (typeof value === "object" && value !== null) {
				traverse(value, newKey);
			} else {
				result[newKey] = value;
			}
		}
	}

	traverse(obj, prefix);
	return result;
}

export const formatRules = (rules?: RulesType | Record<string, any>) => {
	if (!rules) return {};
	if (isString(rules)) {
		return {
			pattern: {
				value: validateFormats[rules],
				message: "此项格式不正确",
			},
		};
	}
	if (isObjectLike(rules)) {
		return rules;
	}
};

export {
	useDynamicForm,
	useFormValues,
	withForwardRef,
	formatSchema,
	flattenObject,
	transformObject
};
