import React, { Component } from 'react';

class AuthGoogle extends Component {
    static SIGN_UP = "Sign up with Google";
    static LOG_IN = "Log in with Google";

    static GOOGLE_BUTTON_ID_ELEMENT = "gg-auth-button";

    constructor(props) {
        super(props);
        this.renderGoogleButton = this.renderGoogleButton.bind(this);
    }

    handleCredentialResponse(response) {
        console.log(response);
    }

    componentDidMount() {
        this.renderGoogleButton();
    }
    
    renderGoogleButton() {
        window.google.accounts.id.initialize({
            client_id: `${process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}`,
            callback: this.handleCredentialResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById(AuthGoogle.GOOGLE_BUTTON_ID_ELEMENT), {
            text: 'continue_with'
        });
    }

    render() {
        // if (!this.props.option) {
        //     return (
        //         <></>
        //     )
        // }
        // clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}

        return (
            <div id={AuthGoogle.GOOGLE_BUTTON_ID_ELEMENT}>
                
            </div>
        );
    }
}

export default AuthGoogle;