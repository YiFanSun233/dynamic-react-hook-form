import { CSSProperties, PropsWithChildren, memo, useMemo } from "react"
import { SchemaCommon } from "../types";
import { ILayout } from "../LayoutContext";

interface IFormWrapper extends PropsWithChildren {
  name: string;
  schema: SchemaCommon;
  layout?: Omit<ILayout, 'column' | 'gap'>
}

const FormWrapper: React.FC<IFormWrapper> = (props) => {
  const { layout, name, schema, children } = props

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
        <div style={{ alignSelf: isHorizontal ? 'center' : 'auto', width: layout?.wrapperWidth }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default memo(FormWrapper)