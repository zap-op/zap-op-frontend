import { Outlet } from "react-router-dom";
import { NavBar } from "../../components";

const LandingWrap = () => {
	return (
		<>
			<NavBar />
			<div className="landing-content-container">
				<Outlet />
			</div>
		</>
	);
};

export default LandingWrap;
