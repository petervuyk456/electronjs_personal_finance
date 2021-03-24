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
  // Required fields
  name: string
  type: AccountType
  dateCreated: Date
  dateModified: Date
  user: User

  // Optional fields
  category?: string
  subCategory?: string
  formula?: string
  budget?: number
  actual?: number
  difference?: number
  notes?: string
  taxOption?: TaxOption
  date?: Date
}
