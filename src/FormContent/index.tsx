import { PropsWithChildren, memo } from "react"
import { SchemaField } from "../types"
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

type IHelpDiv = {
  color?: string;
  position?: 'static' | 'relative' | 'absolute';
  children: React.ReactNode;
}

const HelpDiv: React.FC<IHelpDiv> = props => (
  <div style={{
    clear: 'both',
    color: props.color || 'rgba(0,0,0,.45)',
    position: props.position || 'static',
    top: '100%',
    left: 0,
    marginTop: 3,
    fontSize: 12,
  }}>
    {props.children}
  </div>
)

interface IFormWrapper extends PropsWithChildren {
  name: string;
  schema: SchemaField;
}

const FormWrapper: React.FC<IFormWrapper> = (props) => {
  const { name, schema, children } = props
  const { formState: { errors } } = useFormContext()
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 400,
        }}
      >{schema.title}</label>
      {children}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}> {schema.helpText && <HelpDiv>{schema.helpText}</HelpDiv>}
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            message && <HelpDiv position='absolute' color='#bf1650'>{`${message}`}</HelpDiv>
          )}
        />
      </div>
    </div>
  )
}

export default memo(FormWrapper)