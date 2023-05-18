import AuthGoogleButton from "../../components/Buttons/AuthGoogleButton";
import { useSelector } from "../../store";

const LogInPage = () => {
	const errorMessage = useSelector((state) => state.auth.errorMessage);

	return (
		<div className="log-in-container">
			<h2 className="title">Log in</h2>
			<h4 className="title">Log in your account with</h4>
			<div className="options-container">
				<div className="google-option">
					<AuthGoogleButton option={AuthGoogleButton.LOG_IN_BUTTON_TEXT} />
				</div>
				<div className="github-option"></div>
				{!!errorMessage && (
					<div className="error-message-container">
						<h4 className="error-message">{errorMessage}</h4>
					</div>
				)}
			</div>
		</div>
	);
};

export default LogInPage;
