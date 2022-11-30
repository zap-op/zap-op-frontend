import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import owlensLogo from "../../../assets/logo/owlens-logo_light.svg";

class NavBar extends Component {
    private static readonly NAV_ITEM = {
        ITEM_1: "Lorem",
        ITEM_2: "Lorem",
        LOGIN: "Log in",
        SIGNUP: "Create Account"
    };

    override render(): ReactNode {
        return (
            <div id='nav-bar' className="nav-bar-container">
                <Link to="/" className="nav-logo" draggable={false}>
                    <figure className="logo-container">
                        <img src={owlensLogo} alt="owlens-logo.svg" />
                    </figure>
                </Link>
                <div className='nav-wrap'>
                    <ul className='nav-bar'>
                        <Link to="/" className='nav-item' draggable={false}>
                            {NavBar.NAV_ITEM.ITEM_1}
                        </Link>
                        <Link to="/" className='nav-item' draggable={false}>
                            {NavBar.NAV_ITEM.ITEM_2}
                        </Link>
                    </ul>
                    <ul className="nav-bar-id">
                        <Link to="/login" className='log-in button secondary-button' draggable={false}>
                            {NavBar.NAV_ITEM.LOGIN}
                        </Link>
                        <Link to="/signup" className='create-account button primary-button' draggable={false}>
                            {NavBar.NAV_ITEM.SIGNUP}
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;