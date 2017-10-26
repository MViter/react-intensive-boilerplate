// Core
import React, { Component } from 'react';

// Components
import Grid from '../../Components/Grid';

const appID = '3264416afcb24672bfe70507c20a5562';
const sourceName = 'bbc-news';

export const option = {
    api: `https://newsapi.org/v1/articles?source=${sourceName}&apiKey=${appID}`
};

export default class App extends Component {

    timer = setInterval(() => this.forceUpdate(), 1000);

    render () {


        return (
               <Grid />
        );
    }
}
