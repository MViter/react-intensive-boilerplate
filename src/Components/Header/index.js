// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';
import logo  from '../../theme/assets/newsapi-logo.png';

export default class Header extends Component {

    render () {

        const menu = ['Home', 'Filters', 'Sources', 'About'];
        const menuItems = menu.map((item, key) => {
            return <li key = { key }><a href="#">{ item }</a></li>
        });

        return (
            <section className = { Styles.header }>
                <div className = { Styles.container }>
                    <a href = '#'className = {Styles.title } >
                        <img className = { Styles.logo } src = { logo } alt = "logo"/>
                        <h2 className = { Styles.titleText }>Hot News from All of the World</h2>
                    </a>
                    <ul className = { Styles.menu} >
                        { menuItems }
                    </ul>
                </div>

            </section>
        );
    }
}