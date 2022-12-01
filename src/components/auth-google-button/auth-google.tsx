import { useEffect } from 'react';
import { useLoginMutation } from "../../services/authApi";
import { RootState } from '../../store/store';
import authApi from "../../services/authApi";

// const mapDispatchToProps = {
//     login: authApi.endpoints.login.initiate,

// const mapStateToProps = (state: RootState) => {
//     return {
//         isAuth: state.auth.isAuth,

const SIGN_UP: string = "Sign up with Google";
const LOG_IN: string = "Log in with Google";

const BUTTON_TYPE: GsiButtonConfiguration["type"] = "standard";

export const SIGN_UP_BUTTON_TEXT: GsiButtonConfiguration["text"] = "continue_with";
export const LOG_IN_BUTTON_TEXT: GsiButtonConfiguration["text"] = "signin_with";

const GOOGLE_BUTTON_ID_ELEMENT: string = "gg-auth-button";

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

type TAuthGoogleButtonProps = {
    option: GsiButtonConfiguration["text"];
}

const AuthGoogleButton = (props: TAuthGoogleButtonProps) => {
    const [login] = useLoginMutation();
    const handleCredentialResponse = (response: GoogleCredentialResponse) => {
        login(response.credential);
        console.log(response.credential);
    }

    useEffect(() => {
        function renderGoogleButton() {
            // Config ID to use Google auth
            window.google.accounts.id.initialize({
                client_id: `${process.env['REACT_APP_GOOGLE_OAUTH2_CLIENT_ID']}`,
                callback: handleCredentialResponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById(GOOGLE_BUTTON_ID_ELEMENT)!, {
                type: BUTTON_TYPE,
                text: props.option,
            });
        }
        renderGoogleButton();
    }, [])
    // if (!this.props.option) {
    //     return (
    //         <></>
    //     )
    // }
    // clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}

    return (
        <div id={GOOGLE_BUTTON_ID_ELEMENT}>
        </div>
    );
}

export default AuthGoogleButton;