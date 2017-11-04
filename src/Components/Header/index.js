// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import logo from '../../theme/assets/newsapi-logo.png';

export default class Header extends Component {

    render () {

        const menu = ['Home', 'Filters', 'Sources', 'About'];
        const menuItems = menu.map((item, key) => (
            <li key = { key }><a href = '#'>{ item }</a></li>
        ));

        return (
            <section className = { Styles.container }>
                <div className = { Styles.header }>
                    <a className = { Styles.title } href = '#' >
                        <img alt = 'logo' className = { Styles.logo } src = { logo } />
                        <h2 className = { Styles.titleText } >Hot News from All of the World</h2>
                    </a>
                    <ul className = { Styles.menu } >
                        { menuItems }
                    </ul>
                </div>

            </section>
        );
    }
}
