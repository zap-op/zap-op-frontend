// REACT IMPORT
import * as ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
// REDUX IMPORT
import { Provider } from "react-redux";
import store from "./store/store";
// CONFIG IMPORT
// COMPONENT IMPORT
import ResultsBoard from "./components/results-board";
import ZAP from "./entities/zap";
import TS_ZAP from "./entities/ts-zap";
import ToolkitPortal from "./components/toolkits/toolkit/toolkit-portal";
import ToasterMgr from "./components/toolkits/toasterMgr";
import SelectTargetBoard from "./components/select-target-board";
// STYLE IMPORT
import "./style/style.scss";
import AddScanBoard from "./components/add-scan-board";
import TargetsBoard from "./components/targets-board";
import { AppBoardPage, HomePage, LandingWrap, LogInPage } from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<Provider store={store}>
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={<LandingWrap />}>
					<Route
						index
						element={<HomePage />}
					/>
					<Route
						path="login"
						element={<LogInPage />}
					/>
				</Route>
				<Route
					path="app"
					element={<AppBoardPage />}>
					<Route
						index
						path="dashboard"
						element={<></>}
					/>
					<Route
						path="targets"
						element={<TargetsBoard />}
					/>
					<Route
						path="results"
						element={
							<ResultsBoard
								listResult={[
									{
										name: "Lorem",
										url: "https://lorem.com",
										listScanType: [ZAP.fullName, TS_ZAP.fullName],
									},
									{
										name: "Lorem",
										url: "https://lorem.com",
										listScanType: [ZAP.fullName, TS_ZAP.fullName],
									},
									{
										name: "Lorem",
										url: "https://lorem.com",
										listScanType: [ZAP.fullName, TS_ZAP.fullName],
									},
								]}
							/>
						}
					/>
					<Route
						path="addscan"
						element={
							<AddScanBoard
								configSteps={[
									{
										title: "Select Targets",
										state: SelectTargetBoard.NAME,
									},
									{
										title: "Configure Scans",
										state: "configure-scans-name",
									},
								]}
							/>
						}
					/>
					<Route
						path="wspsettings"
						element={<></>}
					/>
				</Route>
			</Routes>
			<ToolkitPortal />
		</HashRouter>
		<ToasterMgr />
	</Provider>,
);
