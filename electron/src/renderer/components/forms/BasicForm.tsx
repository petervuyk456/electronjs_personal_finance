import * as React from 'react';
import { useHistory } from 'react-router-dom'
import { Button } from './Fields'
import './forms.scss'

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
      <div className="buttonContainer">
        <Button>Accept</Button>
        <Button onClick={goBack}>Cancel</Button>
      </div>
    </form>
  );
}

export default BasicForm