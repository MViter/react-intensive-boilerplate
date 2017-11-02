// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';
import avatar from '../../theme/assets/sourcePict/bbc-news.png';


export default class SourceItems extends Component {

    static propTypes = {
        id: string.isRequired,
        name: string.isRequired,
        description: string.isRequired,
        category: string.isRequired,
        country: string.isRequired,
        language: string.isRequired,
        url: string.isRequired
    };

    render () {

        const { id, name, description, category, country, language, url } = this.props;

        return (
            <section className = { Styles.source } >
                <div className = { Styles.baseInfo } >
                    <img className = { Styles.sourceimg } src = { avatar } />
                    <div className = { Styles.baseInfoNameID } >
                        <a className = { Styles.name } href = { url }>{ name }</a>
                        <div className = { Styles.id } >{ id }</div>
                    </div>
                </div>
                <div className = { Styles.additionalInfo } >
                    <div className = { Styles.category } >{ category }</div>
                    <div className = { Styles.category } >{ category }</div>
                    <div className = { Styles.country } >{ country }</div>
                    <div className = { Styles.language } >{ language }</div>
                    <div className = { Styles.description } >{ description }</div>
                    <div className = { Styles.url } >{ url }</div>
                </div>
            </section>

        );

        //return <h1>Hello from Sources!</h1>

        }
}