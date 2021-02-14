import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Welcome from './WelcomePage/Welcome';

/**
 * Render the Homepage
 */
const Home = () => {
    return <Welcome/>
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

/**
 * Build the main router
 */
export default function AppRouter() : JSX.Element {
    return (
        <HashRouter>
            <Route path="/" exact     component={ Home } />
            <Route path="/firstPage"  component={ FirstPage } />
            <Route path="/secondPage" component={ SecondPage } />
        </HashRouter>
    )
}