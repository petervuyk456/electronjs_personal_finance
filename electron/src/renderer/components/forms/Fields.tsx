import * as React from 'react';
import { IFormFieldState, useFormFieldState } from 'hooks/forms'

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

/**
 * Props specifict to <Select> fields
 */
interface ISelectFieldProps extends IFieldProps{
  options: ISelectOption[]
}

/**
 * Represents a single option in a select field
 */
interface ISelectOption{
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

/**
 * Create a form input field
 * @param type Type of input to create
 * @param props props to add on the input
 */
const InputField = (type: InputFieldType, props: IInputFieldProps) => {
  const { label, setValue,...inputProps } = props
  return FieldContainer(
    props.id,
    label,
    <input type={InputFieldType[type]} {...inputProps} className="input-field"/>
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
    <select {...inputProps} className="select-field">
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
    </select>
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
      <div className="field-container">
        <label htmlFor={id}>{label}</label>
        {input}
      </div>
    )
}

export type InputFieldProps = IInputFieldProps
export type SelectFieldProps = ISelectFieldProps
export type FieldProps = IFieldProps
export type SelectOption = ISelectOption
export type StatelessFieldProps<T extends FieldProps> = Omit<T, keyof IFormFieldState>

export const TextField: React.FC<IInputFieldProps> = (props) => InputField(InputFieldType.text, {...props})
export const NumberField: React.FC<IInputFieldProps> = (props) => InputField(InputFieldType.number, { ...props })
export const MonthField: React.FC<IInputFieldProps> = (props) => InputField(InputFieldType.month, { ...props })
export const PasswordField: React.FC<IInputFieldProps> = (props) => InputField(InputFieldType.password, { ...props })
export { SelectField }
