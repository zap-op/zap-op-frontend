import React, { Component } from 'react';

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