import React, { Component } from 'react';
import { Dropdown as PrimeDropdown } from 'primereact/components/dropdown/Dropdown';

export default class Dropdown extends Component {
    render() {
        return (
            <PrimeDropdown {...this.props} />
        );
    }
}
