// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';


export default class NewsItem extends Component {

    static propTypes = {
        _id:         string.isRequired,
        author:      string.isRequired,
        description: string.isRequired,
        publishedAt: string.isRequired,
        sortBy:      string.isRequired,
        source:      string.isRequired,
        status:      string.isRequired,
        title:       string.isRequired,
        url:         string.isRequired,
        urlToImage:  string.isRequired
    };

    render () {

        const { source, author, title, description, url, urlToImage, publishedAt } = this.props;

        console.log('urlToImage = ', urlToImage);
        console.log('url = ', url);
        console.log('autor = ', author);
        console.log('title = ', title);

        const time = publishedAt.split('T').join(' ');
        const srcToSourceImg = `../../theme/assets/sources/${source}.png`;

        console.log('###source = ', this.context.source);

        return (
            <section className = { Styles.container }>
                <div className = { Styles.newsItem }>
                    <a href = { url } >
                        <img alt = { source } src = { srcToSourceImg } />
                        <img alt = 'news shortcut' src = { urlToImage } />
                        <p className = { Styles.title }> { title } </p>
                        <p className = { Styles.author }> { author } </p>
                        <p className = { Styles.description }> { description }</p>
                        <p className = { Styles.time }> { time }</p>
                    </a>
                </div>
            </section>
        );
    }
}
