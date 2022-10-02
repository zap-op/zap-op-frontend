import AuthGoogle from "../components/auth-google";

export default function SignUp() {
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
                    <AuthGoogle option={AuthGoogle.SIGN_UP}/>
                </div>
                <div className="github-option">
                </div>
            </div>
        </div>
    )
}