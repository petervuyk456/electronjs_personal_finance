import Account from './Account'

export enum BudgetType {
  lastMonth,
  threeMonth,
  sixMonth,
  twelveMonth,
}

export default interface User {
  name: string
  username: string
  password: string
  friends: string
  budgetType: BudgetType
  accounts: Account[]
  dateCreated: Date
  dateModified: Date
}
