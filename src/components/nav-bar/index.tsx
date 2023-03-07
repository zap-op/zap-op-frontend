import { Link } from "react-router-dom";
import owlensLogo from "../../assets/logo/owlens-logo_light.svg";

const NavBar = () => {
	return (
		<div
			id="nav-bar"
			className="nav-bar-container">
			<Link
				to="/"
				className="nav-logo"
				draggable={false}>
				<figure className="logo-container">
					<img
						src={owlensLogo}
						alt="owlens-logo.svg"
					/>
				</figure>
			</Link>
			<div className="nav-wrap">
				<ul className="nav-bar">
					<Link
						to="/"
						className="nav-item"
						draggable={false}>
						{NavBar.NAV_ITEM.ITEM_1}
					</Link>
					<Link
						to="/"
						className="nav-item"
						draggable={false}>
						{NavBar.NAV_ITEM.ITEM_2}
					</Link>
				</ul>
				<ul className="nav-bar-id">
					<Link
						to="/login"
						className="create-account button primary-button"
						draggable={false}>
						{NavBar.NAV_ITEM.LOGIN}
					</Link>
				</ul>
			</div>
		</div>
	);
};

NavBar.NAV_ITEM = {
	ITEM_1: "Lorem",
	ITEM_2: "Lorem",
	LOGIN: "Get Started",
};

export default NavBar;
