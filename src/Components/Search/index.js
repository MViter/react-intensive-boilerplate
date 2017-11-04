// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { func, string } from 'prop-types';

export default class Search extends Component {

    static propTypes = {
        handleSearchInput: func.isRequired,
        searchCriteria:    string.isRequired
    }

    constructor () {
        super();

        this.handleSearch = ::this._handleSearch;
    }

    _handleSearch (event) {

        const searchCriteria = event.target.value;

        this.props.handleSearchInput(searchCriteria);
    }

    render () {

        const { searchCriteria } = this.props;

        return (
            <section className = { Styles.container } >
                <input
                    className = { Styles.searchfield }
                    placeholder = 'Search...'
                    type = 'text'
                    value = { searchCriteria }
                    onChange = { this.handleSearch }
                />
            </section>

        );
    }
}
