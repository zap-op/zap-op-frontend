import AuthGoogleButton from "../../components/buttons/auth-google-button";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const LogInPage = () => {
    const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);

    return (
        <div className="log-in-container">
            <h2 className="title">
                Log in
            </h2>
            <h4 className="title">
                Log in your account with
            </h4>
            <div className="options-container">
                <div className="google-option">
                    <AuthGoogleButton option={AuthGoogleButton.LOG_IN_BUTTON_TEXT} />
                </div>
                <div className="github-option">
                </div>
                <div className="error-message-container">
                    <h4 className="error-message">
                        {errorMessage ? errorMessage : undefined}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;