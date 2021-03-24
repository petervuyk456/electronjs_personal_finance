import * as React from 'react';
import { buildFormForFields } from './AccountForms'

const CreateAccount: React.FC = () => {
  return buildFormForFields([
    'name',
    'user',
    'type',
    'category',
    'subCategory',
    'date',
    'formula',
    'budget',
    'notes',
    'taxOption'
  ])
}

export default CreateAccount