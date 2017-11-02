// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import SourceItem from '../SourceItem';

export default class Sources extends Component {

    static propTypes = {
        sources: array.isRequired
    };

    render () {

        const { sources, isForFilter } = this.props;
        const styleForSource = isForFilter? 'Styles.filter' : 'Styles.info';
        //const sourceStyle = ${Styles.header} ${true ? Styles.red : Styles.blue}

        const sourcesList = sources.map(({ id, name, description, category, country, language, url }, index) => (
            <SourceItem
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