import * as React from 'react';
import { buildFormForFields } from './CategoryForms'

const CreateAccount: React.FC = () => {
  return buildFormForFields([
    'name',
  ])
}

export default CreateAccount