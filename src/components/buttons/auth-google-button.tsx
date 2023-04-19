import { useEffect } from "react";
import { useLoginMutation } from "../../services/authApi";

// https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
type GsiButtonConfiguration = {
	type: "standard" | "icon";
	theme?: "outline" | "filled_blue" | "filled_black";
	size?: "small" | "medium" | "large";
	text?: "signin_with" | "signup_with" | "continue_with" | "signin";
	shape?: "rectangular" | "pill" | "circle" | "square";
	logo_alignment?: "left" | "center";
	width?: string;
	locale?: string;
};

export type GoogleCredentialResponse = {
	credential: string;
	select_by: string;
};

type TAuthGoogleButtonProps = {
	option: GsiButtonConfiguration["text"];
};

const AuthGoogleButton = (props: TAuthGoogleButtonProps) => {
	const [login] = useLoginMutation();

	const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
		await login(response.credential);
	};

	useEffect(() => {
		function renderGoogleButton() {
			// Config ID to use Google auth
			window.google.accounts.id.initialize({
				client_id: `${import.meta.env["VITE_APP_GOOGLE_OAUTH2_CLIENT_ID"]}`,
				callback: handleCredentialResponse,
			});

			window.google.accounts.id.renderButton(document.getElementById(AuthGoogleButton.GOOGLE_BUTTON_ID_ELEMENT)!, {
				type: AuthGoogleButton.BUTTON_TYPE,
				text: props.option,
			});
		}
		renderGoogleButton();
	}, []);

	return <div id={AuthGoogleButton.GOOGLE_BUTTON_ID_ELEMENT}></div>;
};

AuthGoogleButton.SIGN_UP = "Sign up with Google";
AuthGoogleButton.LOG_IN = "Log in with Google";

AuthGoogleButton.BUTTON_TYPE = "standard" as GsiButtonConfiguration["type"];

AuthGoogleButton.SIGN_UP_BUTTON_TEXT = "continue_with" as GsiButtonConfiguration["text"];
AuthGoogleButton.LOG_IN_BUTTON_TEXT = "signin_with" as GsiButtonConfiguration["text"];

AuthGoogleButton.GOOGLE_BUTTON_ID_ELEMENT = "gg-auth-button";

export default AuthGoogleButton;
