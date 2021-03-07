import User from './User'

export enum AccountType {
  income,
  expense,
  asset,
  liability,
}

export enum TaxOption {
  pre,
  post,
  exempt,
  roth,
}

export default interface Account {
  name: string
  type: AccountType
  subtype: string
  date: Date
  user: User
  formula: string
  budget: number
  actual: number
  difference: number
  notes: string
  dateCreated: Date
  dateModified: Date
  taxOption: TaxOption
}
