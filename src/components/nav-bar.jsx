import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NAV_BAR_STRING } from '../utils/string';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='nav-bar' className="nav-bar-container">
                <Link to="/" className="logo">
                    SiteInfo
                </Link>
                <div className='nav-wrap'>
                    <ul className='nav-bar'>
                        <Link to="/" className='nav-item'>
                            {NAV_BAR_STRING.NAV_ITEM_1}
                        </Link>
                        <Link to="/" className='nav-item'>
                            {NAV_BAR_STRING.NAV_ITEM_2}
                        </Link>
                    </ul>
                    <ul className="nav-bar-id">
                        <Link to="/login" className='log-in button secondary-button'>
                            {NAV_BAR_STRING.LOGIN}
                        </Link>
                        <Link to="/signup" className='create-account button primary-button'>
                            {NAV_BAR_STRING.SIGNUP}
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;