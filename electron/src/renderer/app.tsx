import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './router';

function render() {
    ReactDOM.render(
        <AppRouter />
    , document.getElementById('root'));
}

window.onload = function (){
    render();
}
  
