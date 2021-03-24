import * as React from 'react';
import 'styles/welcome.css'
import { Link } from 'react-router-dom';
import path from 'rendererUtils/linkPaths'

const TestLinksPage: React.FC = () => {
    const jsx = (
      <div id="welcome">
        <Link to={path.CreateAccount}>Create Account</Link><br/>
        <Link to={path.EditAccount}>Edit Account</Link><br />
        <Link to={path.CreateUser}>Create User</Link><br/>
        <Link to={path.EditUser}>Edit User</Link><br />
        <Link to={path.CreateCategory}>Create Category</Link><br/>
        <Link to={path.EditCategory}>Edit Category</Link><br/>
      </div>
    )
  
    return jsx;
}

export default TestLinksPage