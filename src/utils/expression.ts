import { cloneDeep, isBoolean, isFunction, isNumber, isObject } from "lodash-es"
import { SchemaField } from "../types";
import { flattenObject } from "./form";

const FUNC_REGEXP = /^{\s*{(.+)}\s*}$/;
const SupportExpressionKey = ['title', 'placeholder', 'required', 'options', 'helpText', 'hidden']

export const isExpression = (str: string, key: string) => {
  if (typeof str !== 'string') {
    return false
  }

  const result = str.match(FUNC_REGEXP)
  if (result && !SupportExpressionKey.includes(key)) {
    throw Error(`此属性不支持表达式：${key}`)
  }

  return result
}

export const hasExpression = (schema: Record<string, any>): Boolean => {
  return Object.keys(schema).some((key) => {
    const item = schema[key]
    if (isObject(item)) {
      return hasExpression(item)
    }
    return isExpression(item, key)
  })
}

export const parseExpression = (func: string, formData: any[] = []) => {
  const match = func.match(FUNC_REGEXP);
  if (!match) {
    console.error('Invalid function:', func);
    return null;
  }

  const depsStr = match[1];
  let funcBody: string;
  try {
    funcBody = depsStr.replaceAll(/\$deps\[(\d+)\]/g, (match, index) => {
      const data = formData[parseInt(index)]
      // 判断类型，根据类型返回

      return JSON.stringify(data);
    })
  } catch (e) {
    console.error('Error parsing function body:', e);
    return null;
  }

  try {
    const result = new Function(`return ${funcBody}`)();
    return result;
  } catch (e) {
    console.error('Error executing function:', e);
    return null;
  }
}

export const parseAllExpression = (schema: any, formData: any[] = []): SchemaField => {
  const _schema = cloneDeep(schema)
  let schema_keys = Object.keys(_schema);
  schema_keys.forEach((key) => {
    const value = _schema[key];
    if (isObject(value)) {
      _schema[key] = parseAllExpression(value, formData)
    }
    if (isFunction(value)) {
      if (_schema?.dependencies) {
        _schema[key] = value(formData)
      } else {
        _schema[key] = value()
      }
    }
    if (isExpression(value, key)) {
      _schema[key] = parseExpression(value, formData)
    }
  })
  return _schema
}