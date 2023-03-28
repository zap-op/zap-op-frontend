// REACT IMPORT
import { Routes, Route, BrowserRouter } from "react-router-dom";
// REDUX IMPORT
import { Provider } from "react-redux";
import store from "./store/store";
// CONFIG IMPORT
// COMPONENT IMPORT
import ZAP from "./entities/zap";
import TS_ZAP from "./entities/ts-zap";
// STYLE IMPORT
import "./style/style.scss";
import { AppBoardPage, HomePage, LandingWrap, LogInPage } from "./pages";
import { AddScanBoard, ResultsBoard, SelectTargetBoard, TargetsBoard } from "./components";
import ToolkitPortal from "./components/toolkits/toolkit/toolkit-portal";
import ToasterMgr from "./components/toolkits/toasterMgr";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
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
				</BrowserRouter>
				<ToasterMgr />
			</Provider>
			,
		</div>
	);
}

export default App;
