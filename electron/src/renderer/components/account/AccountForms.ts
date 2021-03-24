import model, { AccountType, TaxOption } from 'shared/models/Account'
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
  name: { id: 'acctName', label: 'Account Name' },
  user: { id: 'acctUser', label: 'User' },
  type: { id: 'acctType', label: 'Account Type' },
  category: { id: 'acctCat', label: 'Category' },
  subCategory: { id: 'acctSubCat', label: 'Subcategory' },
  date: {
    id: 'acctMonth',
    label: 'Month',
    mapFnc: (val: string) => new Date(val + '-1'),
  },
  formula: { id: 'acctFormula', label: 'Formula' },
  budget: { id: 'acctBudget', label: 'Budget' },
  notes: { id: 'acctNotes', label: 'Notes' },
  taxOption: { id: 'acctTaxOption', label: 'Tax Option' },
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
      case 'category':
      case 'subCategory':
      case 'formula':
      case 'notes':
        fb.addTextField(field.id, field.label)
        break
      case 'budget':
        fb.addNumberField(field.id, field.label)
        break
      case 'date':
        fb.addMonthField(field.id, field.label)
        break
      // Custom select Fields
      case 'user':
        // Todo: load actual user data and allow selecting multiple users
        fb.addSelectField(field.id, field.label, [
          { id: 'user1', name: 'User 1' },
          { id: 'user2', name: 'User 2' },
          { id: 'user3', name: 'User 3' },
        ])
        break
      case 'type':
        fb.addSelectField(
          field.id,
          field.label,
          Enum.keys(AccountType).map((key: string) => ({ id: key, name: key }))
        )
        break
      case 'taxOption':
        fb.addSelectField(
          field.id,
          field.label,
          Enum.keys(TaxOption).map((key: string) => ({ id: key, name: key }))
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
