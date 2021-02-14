import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './router';

/**
 * Render the main application
 */
function render() {
    ReactDOM.render(
        <AppRouter />
    , document.getElementById('root'));
}

/**
 * Perform render once the window loads
 */
window.onload = function (){
    render();
}
  
