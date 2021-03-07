import Account from './Account'

export enum BudgetType {
  lastMonth,
  threeMont,
  sixMonth,
  twelveMonth,
}

export default interface User {
  name: string
  username: string
  friends: string
  budgetType: BudgetType
  accounts: Account[]
}
