// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';

export default class NewsItem extends Component {

    static propTypes = {
        author:      string.isRequired,
        description: string.isRequired,
        publishedAt: string.isRequired,
        source:      string.isRequired,
        title:       string.isRequired,
        url:         string.isRequired,
        urlToImage:  string.isRequired
    };

    getPublishedTimeInCorrectFormat (time) {
        return time ?
            time.split('T').join(' ').split('Z').join('')
            : null;
    }

    render () {

        const { source, author, title, description, url, urlToImage, publishedAt } = this.props;

        const time = this.getPublishedTimeInCorrectFormat(publishedAt);

        return (
            <section className = { Styles.container }>
                <div className = { Styles.newsItem }>
                    <a href = { url } >
                        <img alt = 'news shortcut' src = { urlToImage } />
                        <p className = { Styles.title }> { title } </p>
                        <p className = { Styles.author }> { author } </p>
                        <p className = { Styles.description }> { description }</p>
                        <p className = { Styles.source }> { source }</p>
                        <p className = { Styles.time }> { time }</p>
                    </a>
                </div>
            </section>
        );
    }
}
