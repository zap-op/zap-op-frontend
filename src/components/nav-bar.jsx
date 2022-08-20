import React, { Component } from 'react';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
import { NAV_BAR_STRING } from '../utils/string';
>>>>>>> 10e58b5 (ZO-33 Update Progress Table, Add Auto Scroll toggle)

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    logoOnClickHandler() {
        console.log("Logo on click");
    }

    render() {
        return (
            <div id='nav-bar' className="nav-bar-container">
                <div className="logo" onClick={this.logoOnClickHandler}>
                    <img src="/logo192.png" alt="" />
<<<<<<< HEAD
=======
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
                        <Link to="/login" className='log-in'>
                            {NAV_BAR_STRING.LOGIN}
                        </Link>
                        <Link to="/signup" className='create-account'>
                            {NAV_BAR_STRING.SIGNUP}
                        </Link>
                    </ul>
>>>>>>> 10e58b5 (ZO-33 Update Progress Table, Add Auto Scroll toggle)
                </div>
                <ul className='nav-bar'>
                    <li className='nav-item'>
                        Lorems
                    </li>
                    <li className='nav-item'>
                        Lorems
                    </li>
                    <li className='nav-item'>
                        Lorems
                    </li>
                    <li className='nav-item'>
                        Lorems
                    </li>
                </ul>
                <ul className="nav-bar-id">
                    <li className='sign-in'>
                        Sign in
                    </li>
                    <li className='create-account'>
                        Create Account
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;