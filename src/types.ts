import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";

export type SchemaType = 'object' | 'array' | 'string' | 'boolean' | 'null' | 'number'

export type Widgets = Record<string, React.ComponentType<any>>

export type DependencyPropertyName = 'hidden' | 'required'

type IValue = boolean | string | ((data: any[]) => any) | undefined

export type SchemaField = {
  title?: string;
  type: SchemaType;
  component?: string;
  defaultValue?: any;
  required?: string | boolean;
  rules?: any;
  helpText?: string;
  dependencies?: string[],
  hidden?: IValue;
  transform?: {
    input?: (value: any) => any;
    output?: (e: any) => any;
    format?: (value: any) => any;
  },
  selfProps?: Record<string, any>;
  properties?: { [x: string]: SchemaField };
  column?: number;
  gap?: number;
}

export type SchemaFieldKey = keyof SchemaField

export type FormSchema = {
  column?: number;
  gap?: number;
  type: SchemaType;
  properties?: { [x: string]: SchemaField };
}

export type WithDynamicFormProps = {
  form: React.MutableRefObject<any>;
  method: UseFormReturn<FieldValues, any>;
  schemas: FormSchema;
  onFinished: (value: any) => void;
  widgets: Widgets;
}

export type YiFormProps = WithDynamicFormProps & {
  widgets: Widgets;
}

export type FieldProps = {
  schema: SchemaField;
  ref: React.Ref<any>;
  field: ControllerRenderProps<any, string>;
}

export type ControllerProps = {
  name: string;
  schema: SchemaField;
  element: React.ReactElement;
}

export type FormItemProps = ControllerProps