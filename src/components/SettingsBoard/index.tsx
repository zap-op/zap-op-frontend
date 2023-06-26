import { useNavigate } from "react-router-dom";
import { clearState, useDispatch } from "../../store";

const SettingsBoard = () => {
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(clearState());
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
