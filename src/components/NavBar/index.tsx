import { Link, LinkProps } from "react-router-dom";
import owlensLogo from "../../assets/logo/owlens-logo_light.svg";

type TNavItem = {
	content: string;
	href: LinkProps["to"];
};

const LIST_NAV: TNavItem[] = [
	{
		content: "Take trial",
		href: "#trial",
	},
];

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
					{LIST_NAV.map((item, index) => (
						<Link
							key={index}
							to={item.href}
							className="nav-item"
							draggable={false}>
							{item.content}
						</Link>
					))}
				</ul>
				<ul className="nav-bar-auth">
					<Link
						to="/login"
						className="create-account button primary-button"
						draggable={false}>
						Get Started
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
