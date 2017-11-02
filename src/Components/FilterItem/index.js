// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object, func } from 'prop-types';
import Styles from './styles.scss';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 200,
    },
};

export default class FilterItem extends Component {

    static contextTypes = {
        getNews: func.isRequired
    };

    constructor () {
        super();
        this.handleCheckboxChanging = ::this._handleCheckboxChanging;
    }

    state = {
        checkedSources: ''
    };

    _handleCheckboxChanging (event) {
        const checkBoxValue = event.target.value;
        console.log('event.target.value', event.target.value);
        //this.setState(() =>{

        //});
        console.log('!!! this.props ', this.props);
        console.log('!!! this.context ', this.context);

        this.context.getNews(checkBoxValue);

    }


    render () {

        const { sourceId  } = this.props;

        return (
            <section className = { Styles.container } >
                <div className = { Styles.filterItem } >
                    <input type = 'checkbox'
                           checked
                           value = { sourceId }
                           onChange = { this.handleCheckboxChanging } />
                    <a href = '#'>{ sourceId }</a>
                </div>
            </section>
        );
    }
}