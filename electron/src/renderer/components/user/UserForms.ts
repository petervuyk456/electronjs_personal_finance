import model, { BudgetType } from 'shared/models/User'
import formBuilder from 'rendererUtils/formBuilder'
import * as Enum from 'sharedUtils/Enum'
import log from 'rendererUtils/logging'

interface IFieldInfo {
  id: string
  label: string
  mapFnc?: Function
}

type FieldInfoDictionary = { [key in keyof Partial<model>]: IFieldInfo }

/**
 * Account form fields which map directly to a model property
 */
export const fields: FieldInfoDictionary = {
  name: { id: 'userName', label: 'Name' },
  username: { id: 'userUsername', label: 'Username' },
  password: { id: 'userPassword', label: 'Password' },
  budgetType: { id: 'userBudgetType', label: 'Budget Type' },
}

const budgetTypeLabels: { [key in BudgetType]: string } = {
  0: 'Last month',
  1: '3 months',
  2: '6 months',
  3: '1 year',
}

/**
 * Build a form containing a given list of fields
 * @param formFields List of account fields to include in the array
 */
export const buildFormForFields = (formFields: (keyof model)[]) => {
  const fb = new formBuilder().registerSubmitHandler(buildModelFromFormData)
  for (const i of formFields) {
    // Validate we have a supported field type
    const field = fields[i as keyof model]
    if (!field) {
      log.warn('Attempted to add unsupported field to form: ' + i)
      continue
    }

    // Determine field type for key and add it
    switch (i as keyof model) {
      case 'name':
      case 'username':
        fb.addTextField(field.id, field.label)
        break
      case 'password':
        fb.addPasswordField(field.id, field.label)
        break
      // Custom select Fields
      case 'budgetType':
        fb.addSelectField(
          field.id,
          field.label,
          Enum.keys(BudgetType).map((key: string) => {
            const name = budgetTypeLabels[
              (BudgetType[key as any] as any) as BudgetType
            ] as string
            if (!name) {
              log.error('Unable to get field label for budget type ' + key)
            }
            return {
              id: key,
              name,
            }
          })
        )
        break
      default:
        log.error('Unable to determine field type for ' + i)
        break
    }
  }

  return fb.build()
}

/**
 * Create an account model from for data
 * @param data: data returned from an account form
 */
export const buildModelFromFormData = (data: any) => {
  const model: Partial<model> = {
    dateCreated: new Date(),
    dateModified: new Date(),
  }

  for (let i in fields) {
    const fieldInfo = fields[i as keyof model] as IFieldInfo
    const rawData = data[fieldInfo.id]
    model[i as keyof model] = fieldInfo.mapFnc
      ? fieldInfo.mapFnc(rawData)
      : rawData
  }

  // TODO: Actually do something with the data
  console.log(model)
}
