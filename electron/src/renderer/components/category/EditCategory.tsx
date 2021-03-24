import * as React from 'react';
import { buildFormForFields } from './CategoryForms'

const EditAccount: React.FC = () => {
  return buildFormForFields([
    'name',
  ])
}

export default EditAccount