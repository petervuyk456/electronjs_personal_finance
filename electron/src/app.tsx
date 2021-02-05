import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

const Home = () => {
    return (
        <h1>Home Page</h1>
    )
}

const FirstPage = () => {
    return (
        <h1>First Page</h1>
    )
}

const SecondPage = () => {
    return (
        <h1>Second Page</h1>
    )
}

export default function App() : React.ReactNode {
    return (
        <HashRouter>
        <div>
            <Route path="/" exact     component={ Home } />
            <Route path="/firstPage"  component={ FirstPage } />
            <Route path="/secondPage" component={ SecondPage } />
        </div>
        </HashRouter>
    )
}