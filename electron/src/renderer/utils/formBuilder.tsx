import * as React from 'react'
import BasicForm from 'components/forms/BasicForm'
import * as fields from 'components/forms/Fields'
import { useFormFieldState, IFormFieldState } from 'hooks/forms'

/**
 * Field data used for building a field
 */
interface IFieldData<T extends fields.FieldProps> {
  fieldProps: T,
  componentFnc: React.FC<T>
}

/**
 * Represents a field which has been built
 */
interface IField{
  name: string
  getValue: () => any
}

type inputArgs = [id: string, label: string, initialState?: string]


/**
 * Build a field element from the field data
 * @param data form builder data object describing a single field
 */
const buildField = (data: IFieldData<any>) =>
  React.createElement(
    data.componentFnc as React.FC<any>,
    {
      ...data.fieldProps,
      key: data.fieldProps.id
    }
  )

  
export default class formBuilder{
  private fieldData: (IFieldData<any>)[] = []
  private fields: IField[] = []
  private submitHandlers: Function[] = []

  /**
   * Add a field description for building the field later
   * @param fnc the function component used to build the field
   * @param data Stateless field properties needed to build the field
   */
  private addField<T extends fields.StatelessFieldProps<fields.FieldProps>>(fnc:React.FC<any>, data: T, initialState?: string): void {
    const fieldState = useFormFieldState(initialState)
    
    this.fieldData.push({
      fieldProps: {
        ...data,
        ...fieldState
      },
      componentFnc: fnc
    })
  }

  /**
   * Handle the form submission
   */
  private submit(): void {
    const data: any = {}

    // Build data object
    for (const field of this.fields) {
      data[field.name] = field.getValue()
    }

    // Call each registered handler
    for (const handler of this.submitHandlers) {
      handler(data)
    }
  }
  
  /**
   * Add a field description for an input field
   */
  private addInputField<T extends fields.StatelessFieldProps<fields.InputFieldProps>>(fnc: React.FC<any>, ...args: inputArgs): formBuilder {
    const [id, label, initialState] = args
    this.addField(fnc, { id, label }, initialState)
    return this
  }

  //#region Public Methods 
  public addTextField(...args: inputArgs): formBuilder {return this.addInputField(fields.TextField, ...args )}
  public addNumberField(...args: inputArgs): formBuilder { return this.addInputField(fields.NumberField, ...args) }
  public addMonthField(...args: inputArgs): formBuilder { return this.addInputField(fields.MonthField, ...args) }
  public addPasswordField(...args: inputArgs): formBuilder {return this.addInputField(fields.PasswordField, ...args )}

  /**
   * Add a number field to the form
   * @param id id to attach to the field
   * @param label label to display for the field
   */
  public addSelectField(id: string, label: string, options: fields.SelectOption[]): formBuilder {
    const data: fields.StatelessFieldProps<fields.SelectFieldProps> = { id, label, options }
    const initialValue = options.length > 0 ? options[0].id : undefined // Select first option by default
    this.addField(fields.SelectField, data, initialValue)
    return this
  }

  /**
   * Registers a function to be called on submit
   * It will be passed a data object in the form { <field id>:<field value> } containing each field in the form
   * @param onSubmit callback function to call on form submission
   */
  public registerSubmitHandler(onSubmit: Function): formBuilder {
    this.submitHandlers.push(onSubmit)
    return this
  }

  /**
   * Build the form component
   */
  public build(): React.ReactElement{
    return (
      <BasicForm onSubmit={() => this.submit()}>
        {
          this.fieldData.map(field => {
            // Add field to dictionary so we can grab value later
            this.fields.push(
              {
                name: field.fieldProps.id,
                getValue: () => field.fieldProps.value
              }
            )
            // Build the field component
            return buildField(field)
          })
        }
      </BasicForm>
    )
  }

  //#endregion Public Methods 
}

