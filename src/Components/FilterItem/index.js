// Core
import React, { Component } from 'react';

// Instruments
import { func, string } from 'prop-types';
import Styles from './styles.scss';

export default class FilterItem extends Component {


    static propTypes = {
        getNews:                   func.isRequired,
        getNewsFromDefinedSources: func.isRequired,
        sourceID:                  string.isRequired
    };

    constructor () {
        super();
        this.handleCheckboxClicking = ::this._handleCheckboxClicking;
        // this.getNewsFromDefinedSources = ::this._getNewsFromDefinedSources;
    }

    _handleCheckboxClicking (event) {
        //event.preventDefault();
        const checkBoxValue = event.target.value;
        const isChecked = event.target.checked;

        this.props.getNewsFromDefinedSources(checkBoxValue, this.props.getNews, isChecked);

    }

    render () {

        const { sourceID } = this.props;

        return (
            <section className = { Styles.container } >
                <div className = { Styles.filterItem } >
                    <input
                        type = 'checkbox'
                        //checked = {sourceID.indexOf(sourceIDs) !== -1}
                        value = { sourceID }
                        onClick = { this.handleCheckboxClicking }
                    />
                    <a href = '#'>{ sourceID }</a>
                </div>
            </section>
        );
    }
}
