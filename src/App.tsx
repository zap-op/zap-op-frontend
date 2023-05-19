import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./style/style.scss";

import {
	AppBoardPage, //
	HomePage,
	LandingWrap,
	LogInPage,
} from "./pages";
import {
	AddScanBoard,
	AddScanBoardLinkState, //
	ResultsBoard,
	TargetsBoard,
} from "./components";
import ToolkitPortal from "./components/toolkits/ToolkitPortal";
import ToasterMgr from "./components/toolkits/toasterMgr";

import { useSelector } from "./store";

function App() {
	const isAuth = useSelector((state) => state.auth.isAuth);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								{isAuth && (
									<Navigate
										to="app/dashboard"
										replace
									/>
								)}
								<LandingWrap />
							</>
						}>
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
						element={
							<>
								{!isAuth && (
									<Navigate
										to="/"
										replace
									/>
								)}
								<AppBoardPage />
							</>
						}>
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
							element={<ResultsBoard />}
						/>
						<Route
							path="addscan"
							element={
								<AddScanBoard
									configSteps={[
										{
											title: "Select Targets",
											state: AddScanBoardLinkState.SelectTarget,
										},
										{
											title: "Configure Scans",
											state: AddScanBoardLinkState.ScanOptions,
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
		</div>
	);
}

export default App;
