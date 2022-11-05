import { Outlet } from "react-router-dom";
import NavBar from "../components/nav-bar";

function LandingPage() {
    return (
        <>
            <NavBar />
            <div className='landing-content-container'>
                <Outlet />
            </div>
        </>
    )
}

export default LandingPage;