// Core
import React, { Component } from 'react';

// Components
import Grid from '../../Components/Grid';

export const appID = '3264416afcb24672bfe70507c20a5562';
export const api = 'https://newsapi.org/';

export default class App extends Component {

    render () {

        return (
            <Grid api = { api } appID = { appID } />
        );
    }
}
