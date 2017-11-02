// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import FilterItem from '../FilterItem';

export default class Filter extends Component {

    static propTypes = {
        id: string.isRequired
    };

    constructor () {
        super();

        this.getSources = ::this._getSources;
        this.state = {
            sources: []
        }
    }

    componentWillMount() {
        this._getSources();
    }

    _getSources () {

        const { api } = this.props;
        fetch(`${api}v1/sources`,
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

        const sourceList = sources.map(({ id }, index) => (
            <FilterItem
                sourceId = { sources[index].id }
            />
        ));

        return (
            <section className = { Styles.container } >
                <div className = { Styles.filter } >
                    { sourceList }
                </div>
            </section>
        );

        /* const sourceList = sources.map(({ id }, index) => (
            <FilterItem sourced = { sources[index].id }/>
        ));

        return (
            <section className = { Styles.container }>
                <div className = { Styles.filter } >
                    <select name='sourceFilter'>
                        { sourceList }
                    </select>
                </div>
            </section>

        ); */
    }
}