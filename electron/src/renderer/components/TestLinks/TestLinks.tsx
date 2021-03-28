import * as React from 'react';
import { Link } from 'react-router-dom';
import path from 'rendererUtils/linkPaths'
import './testLinks.scss'

const TestLinksPage: React.FC = () => {
    const jsx = (
      <div id="welcome">
        <h3 className="categoryTitle">Account</h3>
        <Link className="link" to={path.CreateAccount}>Create Account</Link><br/>
        <Link className="link" to={path.EditAccount}>Edit Account</Link><br />
        <h3 className="categoryTitle">User</h3>
        <Link className="link" to={path.CreateUser}>Create User</Link><br/>
        <Link className="link" to={path.EditUser}>Edit User</Link><br />
        <h3 className="categoryTitle">Category</h3>
        <Link className="link" to={path.CreateCategory}>Create Category</Link><br/>
        <Link className="link" to={path.EditCategory}>Edit Category</Link><br/>
      </div>
    )
  
    return jsx;
}

export default TestLinksPage