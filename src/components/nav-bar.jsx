import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='nav-bar' className="nav-bar-container">
                <Link to="/" className="logo">
                    <img src="/logo192.png" alt="" />
                </Link>
                <div className='nav-wrap'>
                    <ul className='nav-bar'>
                        <Link to="/" className='nav-item'>
                            Lorems
                        </Link>
                        <Link to="/" className='nav-item'>
                            Lorems
                        </Link>
                        <Link to="/" className='nav-item'>
                            Lorems
                        </Link>
                        <Link to="/" className='nav-item'>
                            Lorems
                        </Link>
                    </ul>
                    <ul className="nav-bar-id">
                        <Link to="/" className='sign-in'>
                            Sign in
                        </Link>
                        <Link to="/signup" className='create-account'>
                            Create Account
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;