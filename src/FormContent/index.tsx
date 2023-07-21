import { CSSProperties, PropsWithChildren, memo, useMemo } from "react"
import { SchemaCommon } from "../types";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { ILayout } from "../LayoutContext";

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
  schema: SchemaCommon;
  layout?: Omit<ILayout, 'column' | 'gap'>
}

const FormWrapper: React.FC<IFormWrapper> = (props) => {
  const { layout, name, schema, children } = props
  const { formState: { errors } } = useFormContext()

  const isHorizontal = useMemo(() => layout?.layout === 'horizontal', [layout])
  const direction = useMemo(() => isHorizontal ? 'row' : 'column', [isHorizontal])

  const labelStyle: CSSProperties = useMemo(() => isHorizontal ? {
    width: layout?.labelWidth || 'auto',
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'end',
    fontSize: 14,
    fontWeight: 400,
  } : {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 400,
  }, [isHorizontal])

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: direction,
        columnGap: isHorizontal ? 12 : 0
      }}>
        <div style={labelStyle}>
          <label
            htmlFor={name}
          >{schema.title}</label>
        </div>
        <div style={{ alignSelf: 'center', width: layout?.wrapperWidth }}>
          {children}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {schema.helpText && <HelpDiv>{schema.helpText}</HelpDiv>}
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                message && <HelpDiv position='absolute' color='#bf1650'>{`${message}`}</HelpDiv>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(FormWrapper)