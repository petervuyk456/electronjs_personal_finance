import * as React from 'react';
import { buildFormForFields } from './UserForms'

const EditUser: React.FC = () => {
  return buildFormForFields([
    'name',
    'username',
    'password',
    'budgetType',
  ])
}

export default EditUser