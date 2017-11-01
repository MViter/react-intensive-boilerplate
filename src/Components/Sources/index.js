// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import Source from '../Source';

export default class Sources extends Component {

    static propTypes = {
        sources: array.isRequired
    };

    render () {

        const { sources } = this.props;

        const sourcesList = sources.map(({ id, name, description, category, country, language, url }, index) => (
            <Source
                avatar = { `'../../theme/assets/sourcePict/${sources[index].id}.png'` }
                category = { sources[index].category }
                country = { sources[index].country }
                description = { sources[index].description }
                id = { sources[index].id }
                itemUrl = { sources[index].url }
                key = { index }
                language = { sources[index].language }
                name = { sources[index].name }
                url = { sources[index].url }
            />
        ));

        return (
            <section className = { Styles.container }>
                { sourcesList }
            </section>
        );
    }
}