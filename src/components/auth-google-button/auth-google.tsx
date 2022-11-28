import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';

const mapStateToProps = (state: RootState) => {
    return {
        thisStore: state
    }
}

// https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
type GsiButtonConfiguration = {
    type: 'standard' | 'icon';
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'small' | 'medium' | 'large';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    logo_alignment?: 'left' | 'center';
    width?: string;
    locale?: string;
}

export type GoogleCredentialResponse = {
    credential: string;
    select_by: string;
}

type TmapStateToProps = ReturnType<typeof mapStateToProps>;

type TAuthGoogleButtonProps =
    TmapStateToProps & {
        option: GsiButtonConfiguration["text"];
    }

class AuthGoogleButton extends Component<TAuthGoogleButtonProps> {
    private static readonly SIGN_UP = "Sign up with Google";
    private static readonly LOG_IN = "Log in with Google";

    private static readonly BUTTON_TYPE: GsiButtonConfiguration["type"] = "standard";

    static readonly SIGN_UP_BUTTON_TEXT: GsiButtonConfiguration["text"] = "continue_with";
    static readonly LOG_IN_BUTTON_TEXT: GsiButtonConfiguration["text"] = "signin_with";

    static readonly GOOGLE_BUTTON_ID_ELEMENT = "gg-auth-button";

    constructor(props: TAuthGoogleButtonProps) {
        super(props);
    }

    override componentDidMount(): void {
    }

    handleCredentialResponse(response: GoogleCredentialResponse) {
    }

    renderGoogleButton() {
        // Config ID to use Google auth
        window.google.accounts.id.initialize({
            client_id: `${process.env['REACT_APP_GOOGLE_OAUTH2_CLIENT_ID']}`,
            callback: this.handleCredentialResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById(AuthGoogleButton.GOOGLE_BUTTON_ID_ELEMENT)!, {
            type: AuthGoogleButton.BUTTON_TYPE,
            text: this.props.option,
        });
    }

    override render(): ReactNode {
        // if (!this.props.option) {
        //     return (
        //         <></>
        //     )
        // }
        // clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}

        return (
            <div id={AuthGoogleButton.GOOGLE_BUTTON_ID_ELEMENT}>

            </div>
        );
    }
}

export default connect(mapStateToProps)(AuthGoogleButton);