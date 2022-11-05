import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NAV_BAR_STRING } from '../utils/string';
import owlensLogo from "../assets/owlens-logo.svg";
class NavBar extends Component {
    override render() {
        return (
            <div id='nav-bar' className="nav-bar-container">
                <Link to="/" className="nav-logo" draggable="false">
                    <figure className="logo-container">
                        <img src={owlensLogo} alt="owlens-logo.svg" />
                    </figure>
                </Link>
                <div className='nav-wrap'>
                    <ul className='nav-bar'>
                        <Link to="/" className='nav-item' draggable="false">
                            {NAV_BAR_STRING.NAV_ITEM_1}
                        </Link>
                        <Link to="/" className='nav-item' draggable="false">
                            {NAV_BAR_STRING.NAV_ITEM_2}
                        </Link>
                    </ul>
                    <ul className="nav-bar-id">
                        <Link to="/login" className='log-in button secondary-button' draggable="false">
                            {NAV_BAR_STRING.LOGIN}
                        </Link>
                        <Link to="/signup" className='create-account button primary-button' draggable="false">
                            {NAV_BAR_STRING.SIGNUP}
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;