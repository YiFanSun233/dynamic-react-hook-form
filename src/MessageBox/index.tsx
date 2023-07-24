import { ErrorMessage } from "@hookform/error-message";
import { memo, useMemo } from "react"
import { useFormState } from "react-hook-form";

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


const MessageBox: React.FC<{
  name: string;
  helpText?: React.ReactNode;
}> = ({
  name,
  helpText
}) => {
    const { errors } = useFormState()
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {helpText && <HelpDiv>{helpText}</HelpDiv>}
        {
          errors?.[name]?.root ? <HelpDiv position='absolute' color='#bf1650'>{`${errors?.[name]?.root?.message}`}</HelpDiv> :
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                message && <HelpDiv position='absolute' color='#bf1650'>{`${message}`}</HelpDiv>
              )}
            />}
      </div>
    )
  }

export default memo(MessageBox)