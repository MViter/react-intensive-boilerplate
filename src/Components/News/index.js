// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';
import { TransitionGroup, Transition } from 'react-transition-group';

// Components
import NewsItem from '../NewsItem';
import { getUniqueID } from '../../helpers';

export default class News extends Component {

    static propTypes = {
        news: array.isRequired
    }

    render () {

        const { news } = this.props;

        let newsList = [];

        news.forEach(({ articles, source }) => {

            newsList = newsList.concat(articles.map(({ author, description, url, publishedAt, title, urlToImage }) => (
                <NewsItem
                    author = { author }
                    description = { description }
                    key = { getUniqueID(10) }
                    publishedAt = { publishedAt }
                    source = { source }
                    title = { title }
                    url = { url }
                    urlToImage = { urlToImage }
                />
            )));
        });

        return (
            <section className = { Styles.container }>
               {/*<TransitionGroup>{ newsList }</TransitionGroup>*/}
                { newsList }
            </section>
        );
    }
}
