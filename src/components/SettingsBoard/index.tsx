import { useLogoutMutation, useSelector } from "../../store";

const SettingsBoard = () => {
	const [logout] = useLogoutMutation();
	const userInfor = useSelector((state) => ({
		pictureUrl: state.auth.picture,
		email: state.auth.email,
		name: state.auth.name,
	}));

	const {
		email, //
		name,
		pictureUrl,
	} = { ...userInfor };

	const handleLogOut = () => {
		logout();
	};
	return (
		<div className="settings-board-container">
			<div className="avatar-section-container">
				<img
					className="user-avatar"
					src={pictureUrl}
					alt="user avatar"
				/>
			</div>
			<ul className="info-list">
				<li>
					<span className="title">Email</span>
					<span className="content">{email}</span>
				</li>

				<li>
					<span className="title">Full name</span>
					<span className="content">{name}</span>
				</li>
			</ul>
			<div className="hr"></div>
			<div
				className="logout-button button secondary-button"
				onClick={handleLogOut}>
				Log out
			</div>
		</div>
	);
};

export default SettingsBoard;
