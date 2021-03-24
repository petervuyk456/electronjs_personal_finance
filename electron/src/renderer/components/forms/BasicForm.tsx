import * as React from 'react';
import { useHistory } from 'react-router-dom'

interface IFormProps{
  onSubmit: () => void
}

/**
 * A basic form with accept and cancel buttons which bring you to the previous page after submitting
 * @param props Default react FC props
 */
const BasicForm: React.FC<IFormProps> = (props) => {
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit()
    goBack()
  };

  const goBack = () => {
    history.goBack()
  }

  return (
    <form onSubmit={handleSubmit}>
      {props.children}
      <button type="submit">
        Accept
      </button>
      <button type="button" onClick={goBack}>
        Cancel
      </button>
    </form>
  );
}

export default BasicForm