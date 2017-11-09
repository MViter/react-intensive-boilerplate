// Core
import React, { Component } from 'react';

// Instruments
import { string, func, array } from 'prop-types';
import Styles from './styles.scss';

// Components
import FilterItem from '../FilterItem';

export default class Filter extends Component {

    static propTypes = {
        api:                       string.isRequired,
        getNews:                   func.isRequired,
        getNewsFromDefinedSources: func.isRequired,
        sources:                   array.isRequired
    };

    constructor () {
        super();

        this.getSources = ::this._getSources;
        this.state = {
            sources:        [],
            checkedSources: []
        };
    }

    componentWillMount () {
        this._getSources();
    }

    async _getSources () {
        const { api } = this.props;

        await fetch(`${api}v1/sources`,
            {
                method: 'GET'
            }).then((response) => {

            if (response.status !== 200) {
                throw new Error('Sources were not loaded.');
            }

            return response.json();
        }).then((response) => {
            this.setState({
                sources: response.sources });
        })
            .catch(({ message }) => console.log(message));
    }

    render () {

        const { sources } = this.state;
        const { getNews, getNewsFromDefinedSources, sources: sourceIDs }  = this.props;

        const sourceList = sources.map(({ id }, index) => (
            <FilterItem
                getNews = { getNews }
                getNewsFromDefinedSources = { getNewsFromDefinedSources }
                key = { id }
                sourceID = { sources[index].id }
                sourceIDs = { sourceIDs }
            />
        ));

        return (
            <section className = { Styles.container } >
                <div className = { Styles.filter } >
                    { sourceList }
                </div>
            </section>
        );
    }
}
