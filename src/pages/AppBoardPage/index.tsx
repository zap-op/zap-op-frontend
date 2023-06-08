import { Outlet } from "react-router-dom";
import {
	Breadcrumb,
	PanelDashboard,
} from "../../components";

const AppBoardPage = () => {
	return (
		<div className="app-board-container">
			<PanelDashboard />
			<div className="main-board-container">
				<div className="main-board_breadcrumb-container">
					<Breadcrumb
						rootLink={{
							href: "app",
							name: "app",
						}}
					/>
				</div>
				<div className="main-board_content-container">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppBoardPage;
