import Account from './Account'

export default interface Category {
  name: string
  subCategories: Category[]
  accounts: Account[]
  parent: Category
  dateCreated: Date
  dateModified: Date
}
