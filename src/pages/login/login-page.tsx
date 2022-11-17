import AuthGoogle from "../../components/auth-google-button/auth-google";

function LogInPage() {
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
                    <AuthGoogle option={AuthGoogle.LOG_IN_BUTTON_TEXT}/>
                </div>
                <div className="github-option">
                </div>
            </div>
        </div>
    )
}

export default LogInPage;