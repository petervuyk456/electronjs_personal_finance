import * as React from 'react';
import { IFormFieldState } from 'hooks/forms'
import * as strings from 'rendererUtils/strings'

/**
 * Props which are shared by all field types
 */
interface IFieldProps extends IFormFieldState{
  label: string
  id: string,
}

/**
 * Props specifict to <Input> fields
 */
interface IInputFieldProps extends IFieldProps{
}

interface IButtonProps{
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * Props specifict to <Select> fields
 */
interface ISelectFieldProps extends IFieldProps{
  options: ISelectOption[]
}

/**
 * Represents a single option in a select field
 */
interface ISelectOption {
  id: string,
  name: string
}

/**
 * HTML Input field types
 */
enum InputFieldType{
  //button,
  //checkbox,
  //color,
  //date,
  //email,
  //file,
  //hidden,
  //image,
  month,
  number,
  password,
  //radio,
  //range,
  //reset,
  //search,
  //submit,
  //tel,
  text,
  //time,
  //url,
  //week
}

enum ButtonType{
  button,
  submit,
  reset
}

enum CSSClass {
  field = "form-field",
  button = "form-button",
  fieldContainer = "field-container",
  fieldLabel = "field-label",
  inputField = "input-field",
  selectField = "select-field",
}



/**
 * Create a form input field
 * @param type Type of input to create
 * @param props props to add on the input
 */
const InputField = (props: IInputFieldProps & { type: InputFieldType }) => {
  const { type, label, setValue,...inputProps } = props
  return FieldContainer(
    props.id,
    label,
    <input type={InputFieldType[type]} {...inputProps} className={strings.join(" ", CSSClass.field, CSSClass.inputField)}/>
  )
}

/**
 * Create a form select field
 * @param props props to add on the field
 */
const SelectField: React.FC<ISelectFieldProps> = (props) => {
  const { options, label, setValue, ...inputProps } = props
  
  return FieldContainer(
    props.id,
    label,
    <select {...inputProps} className={strings.join(" ", CSSClass.field, CSSClass.selectField)}>
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
    </select>
  )
}

const GenericButton: React.FC<IButtonProps & {type: ButtonType}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={CSSClass.button}>
      {props.children}
    </button>
  )
}

/**
 * Wrap a form field with a label and container div
 * @param id form field id
 * @param label label to display for the field
 * @param input jsx input field
 */
const FieldContainer = (id: string, label: string, input: JSX.Element) => {
    return (
      <div className={CSSClass.fieldContainer}>
        <label htmlFor={id} className={CSSClass.fieldLabel}>{label}</label>
        {input}
      </div>
    )
}

export type InputFieldProps = IInputFieldProps
export type SelectFieldProps = ISelectFieldProps
export type FieldProps = IFieldProps
export type SelectOption = ISelectOption
export type StatelessFieldProps<T extends FieldProps> = Omit<T, keyof IFormFieldState>

export const TextField: React.FC<IInputFieldProps> = (props) => InputField({type: InputFieldType.text, ...props})
export const NumberField: React.FC<IInputFieldProps> = (props) => InputField({type: InputFieldType.number,  ...props })
export const MonthField: React.FC<IInputFieldProps> = (props) => InputField({type: InputFieldType.month,  ...props })
export const PasswordField: React.FC<IInputFieldProps> = (props) => InputField({type: InputFieldType.password,  ...props })
export const Button: React.FC<IButtonProps> = (props) => GenericButton({type: ButtonType.button, ...props})
export const SubmitButton: React.FC<IButtonProps> = (props) => GenericButton({ type: ButtonType.submit, ...props })
export const ResetButton: React.FC<IButtonProps> = (props) => GenericButton({type: ButtonType.reset, ...props})
export { SelectField }
