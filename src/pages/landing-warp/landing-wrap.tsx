import { Outlet } from "react-router-dom";
import NavBar from "../../components/navs/nav-bar/nav-bar";

function LandingWrap() {
    return (
        <>
            <NavBar />
            <div className='landing-content-container'>
                <Outlet />
            </div>
        </>
    )
}

export default LandingWrap;