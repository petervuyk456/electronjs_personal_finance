import * as React from 'react';
import ReactDOM from 'react-dom';
import 'css/welcome.css'
import logger from 'rendererUtils/logging';

const Welcome: React.FunctionComponent = () => {
  logger.info("Loading welcome page")
    const jsx = (
        <div className="fade-in welcome" id="welcome">
        </div>
    )
    
    setTimeout(() => { ReactDOM.render(getWelcomeMsg(), document.getElementById("welcome")) }, 1000)
  
    return jsx;
}

const getWelcomeMsg: () => JSX.Element = () => (
    <div className="welcome-msg">
        <div className="text">Welcome to Falcon Finance! Here's an ugly loading page. Just testing some stuff out.</div>
        <br />
        <div className="loader"></div>
    </div>
)

export default Welcome