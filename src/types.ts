import { ControllerRenderProps, CriteriaMode, FieldValues, Resolver, UseFieldArrayReturn, UseFormReturn, ValidationMode } from "react-hook-form";

export type SchemaType = 'object' | 'string' | 'boolean' | 'null' | 'number'
type ArrayType = 'array'

export type Widgets = Record<string, React.ComponentType<any>>

export type DependencyPropertyName = 'hidden' | 'required'

type IValue = boolean | string | ((data: any[]) => any) | undefined

export type SchemaCommon = {
  title?: string;
  component?: string;
  defaultValue?: any;
  required?: string | boolean;
  rules?: any;
  helpText?: string;
  dependencies?: string[],
  hidden?: IValue;
  transform?: {
    format?: (value: any) => any;
    input?: (value: any) => any;
    output?: (value: any) => any;
  },
  column?: number;
  gap?: number;
}

export type NormalSchema = SchemaCommon & {
  type: SchemaType;
  selfProps?: Record<string, any>;
  properties?: { [x: string]: SchemaField };
}

export type ArraySchema = SchemaCommon & {
  type: ArrayType;
  item: {
    type: 'object',
    properties: { [x: string]: SchemaCommon & { selfProps?: Record<string, any> } };
  }
}

export type SchemaField = NormalSchema | ArraySchema

export type SchemaFieldKey = keyof SchemaField

export type FormSchema = {
  column?: number;
  gap?: number;
  layout?: 'horizontal' | 'vertical',
  labelWidth?: number | string,
  wrapperWidth?: number | string,
  type: SchemaType;
  properties?: { [x: string]: SchemaField };
}

export type WithDynamicFormProps = {
  form: React.MutableRefObject<any>;
  config: Partial<{ mode: keyof ValidationMode; reValidateMode: "onBlur" | "onChange" | "onSubmit"; defaultValues: { [x: string]: any; } | ((payload?: unknown) => Promise<FieldValues>); values: FieldValues; resetOptions: Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepTouched: boolean; keepIsValid: boolean; keepSubmitCount: boolean; }> | undefined; resolver: Resolver<FieldValues, any>; context: any; shouldFocusError: boolean; shouldUnregister: boolean; shouldUseNativeValidation: boolean; criteriaMode: CriteriaMode; delayError: number; }> | undefined;
  schemas: FormSchema;
  onFinished: (value: any) => void;
  widgets: Widgets;
}

export type YiFormProps = WithDynamicFormProps

export type NormalFieldProps = {
  schema: NormalSchema;
  ref: React.Ref<any>;
  field: ControllerRenderProps<any, string>;
}

export type ArrayFieldProps = {
  schema: ArraySchema['item']['properties'];
  ref: React.Ref<any>;
  method: UseFieldArrayReturn<FieldValues, string, "id">;
}

export type ControllerProps = {
  name: string;
  schema: SchemaCommon & { selfProps?: Record<string, any> };
  element: React.ReactElement;
}

export type FormItemProps = ControllerProps

export type FieldArray = UseFieldArrayReturn<FieldValues, string, "id">