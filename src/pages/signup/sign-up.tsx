import AuthGoogle from "../../components/auth-google-button/auth-google";

function SignUp() {
    return (
        <div className="sign-up-container">
            <h2 className="title">
                Get started
            </h2>
            <h4 className="title">
                Create your account with
            </h4>
            <div className="options-container">
                <div className="google-option">
                    <AuthGoogle option={AuthGoogle.SIGN_UP_BUTTON_TEXT}/>
                </div>
                <div className="github-option">
                </div>
            </div>
        </div>
    )
}

export default SignUp;