// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

export default class Search extends Component {

    render () {
        return (
            <section className = { Styles.container } >
                    <input  className = { Styles.searchfield } type="text" placeholder="Search..." onChange={this.handleSearch} />
            </section>

        );
    }
}