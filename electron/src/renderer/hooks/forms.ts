import React from 'react'

export interface IFormFieldState {
  value: any
  onChange: (...args: any[]) => any
  setValue: (value: any) => void
}

/**
 * Setup react state for a form field
 * @param initialValue
 */
const useFormFieldState: (
  initialValue?: string
) => IFormFieldState = initialValue => {
  initialValue = initialValue ?? ''
  const [value, setValue] = React.useState(initialValue)
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  )
  return { value, onChange, setValue }
}

export { useFormFieldState }
