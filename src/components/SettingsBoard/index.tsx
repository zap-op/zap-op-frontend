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
