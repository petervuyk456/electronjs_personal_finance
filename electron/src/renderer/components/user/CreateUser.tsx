import * as React from 'react';
import { buildFormForFields } from './UserForms'

const CreateUser: React.FC = () => {
  return buildFormForFields([
    'name',
    'username',
    'password',
    'budgetType',
  ])
}

export default CreateUser