// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import StylesForMobile from './stylesForMobile.scss';
import StylesForTablet from './stylesForTablet.scss';
import logo from '../../theme/assets/newsapi-logo.png';
import MediaQuery from 'react-responsive';
import { Transition } from 'react-transition-group';
import TweenMax, { Linear } from 'gsap';

export default class Header extends Component {

    constructor () {
        super();

        this.handleLogoAppear = ::this._handleLogoAppear;
    }

    _handleLogoAppear () {
        TweenMax.to('#logo', 4, { rotation: 360, transformOrigin: '0px', repeat: 100, ease: Linear.easeNone });
    }

    render () {

        const menu = ['Home', 'Sources', 'About'];
        const menuItems = menu.map((item, key) => (
            <li key = { key }><a href = '#'>{ item }</a></li>
        ));

        return (
            <section>
                <MediaQuery query = '(min-device-width: 1064px)'>
                    <div className = { Styles.container }>
                        <div className = { Styles.header }>
                            <Transition
                                appear
                                in
                                timeout = { 5000 }
                                onEnter = { this._handleLogoAppear } >
                                <a className = { Styles.title } href = '#' >
                                    <img alt = 'logo' className = { Styles.logo } id = 'logo' src = { logo } />
                                    <h2 className = { Styles.titleText } />
                                </a>
                            </Transition>
                            <nav className = { Styles.nav }>
                                <ul>
                                    { menuItems }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </MediaQuery>

                <MediaQuery query = '(max-device-width: 1063px)'>
                    <MediaQuery query = '(min-device-width: 480px)'>
                        <div className = { StylesForTablet.container }>
                            <div className = { StylesForTablet.header }>
                                <Transition
                                    appear
                                    in
                                    timeout = { 5000 }
                                    onEnter = { this._handleLogoAppear } >
                                    <a className = { StylesForTablet.title } href = '#' >
                                        <img alt = 'logo' className = { Styles.logo } id = 'logo' src = { logo } />
                                        <h2 className = { StylesForTablet.titleText } />
                                    </a>
                                </Transition>
                                <nav className = { StylesForTablet.nav }>
                                    <ul>
                                        { menuItems }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </MediaQuery>

                    <MediaQuery query = '(max-device-width: 479px)'>
                        <div className = { StylesForMobile.container }>
                            <div className = { StylesForMobile.header }>
                                <Transition
                                    appear
                                    in
                                    timeout = { 5000 }
                                    onEnter = { this._handleLogoAppear } >
                                    <a className = { StylesForMobile.title } href = '#' >
                                        <img alt = 'logo' className = { StylesForMobile.logo } id = 'logo' src = { logo } />
                                        <h2 className = { StylesForMobile.titleText } />
                                    </a>
                                </Transition>
                                <nav className = { StylesForMobile.nav }>
                                    <ul>
                                        { menuItems }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </MediaQuery>
                </MediaQuery>
            </section>
        );
    }
}
