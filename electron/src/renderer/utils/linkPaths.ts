/**
 * Pieces for building full paths
 */
const enum subpath {
  account = '/account',
  user = '/user',
  category = '/category',
  new = '/new',
  edit = '/edit',
}

/**
 * List of valid urls
 */
const paths = {
  Home: '/',
  AccountSubpath: subpath.account,
  CreateAccount: subpath.account + subpath.new,
  EditAccount: subpath.account + subpath.edit,
  UserSubpath: subpath.user,
  CreateUser: subpath.user + subpath.new,
  EditUser: subpath.user + subpath.edit,
  CategorySubpath: subpath.category,
  CreateCategory: subpath.category + subpath.new,
  EditCategory: subpath.category + subpath.edit,
}

export default paths
