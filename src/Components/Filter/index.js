// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import Sources from '../Sources';

export default class Filter extends Component {

    render () {

        const { sourcesIDList, sources } = this.props;

        return (
            <section className = { Styles.container } >
                Set news source
                <div className = { Styles.filter } >
                    <Sources sources = { sources } sourcesIDList = { sourcesIDList } />
                </div>
            </section>
        );
    }
}