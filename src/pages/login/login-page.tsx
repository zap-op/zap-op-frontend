import AuthGoogle, { LOG_IN_BUTTON_TEXT } from "../../components/auth-google-button/auth-google";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function LogInPage() {
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
                    <AuthGoogle option={LOG_IN_BUTTON_TEXT} />
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