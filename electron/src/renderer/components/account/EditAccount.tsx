import * as React from 'react';
import { buildFormForFields } from './AccountForms'

const EditAccount: React.FC = () => {
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

export default EditAccount