import {
	Route, //
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";

import "./style/style.scss";

import {
	HomePage, //
	LogInPage,
	LandingWrap,
	AppBoardPage,
} from "./pages";
import {
	ToasterMgr, //
	ModalPortal,
	ModalContext,
	AddScanBoard,
	ResultsBoard,
	ResultsTable,
	TargetsBoard,
	ToolkitPortal,
	ResultsDetail,
	AddScanBoardLinkState,
	DashBoard,
	SettingsBoard,
} from "./components";

import { useRefreshCredentialsMutation, useSelector } from "./store";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookieMgr";
import { TOKEN_TYPE } from "./utils/types";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const [refreshCredentials, { isError: isRefreshCredentialsError }] = useRefreshCredentialsMutation();
	const isAuth = useSelector((state) => state.auth.isAuth);

	useEffect(() => {
		if (!isAuth) {
			if (!getCookie(TOKEN_TYPE.ACCESS) && !getCookie(TOKEN_TYPE.REFRESH)) {
				navigate("/");
				return;
			}
			refreshCredentials();
			return;
		}
		if (!location.pathname.includes("/app")) {
			navigate("/app");
		}
	}, [isAuth]);

	useEffect(() => {
		if (isRefreshCredentialsError) {
			navigate("/");
		}
	}, [isRefreshCredentialsError]);

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<>
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
							<AppBoardPage />
						</>
					}>
					<Route
						index
						element={<DashBoard />}
					/>
					<Route
						path="targets"
						element={
							<ModalContext.Provider
								value={{
									isOpenModal,
									handleOpenModal: setIsOpenModal,
									setModalComponent,
								}}>
								<TargetsBoard />
							</ModalContext.Provider>
						}
					/>
					<Route
						path="results"
						element={<ResultsBoard />}>
						<Route
							index
							element={<ResultsTable heightScrollWrap="80vh" />}
						/>
						<Route
							path=":resultId"
							element={<ResultsDetail />}
						/>
					</Route>
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
						path="settings"
						element={<SettingsBoard />}
					/>
				</Route>
			</Routes>
			<ToolkitPortal />
			{isOpenModal ? <ModalPortal handleOpenModal={setIsOpenModal}>{modalComponent}</ModalPortal> : <></>}
			<ToasterMgr />
		</div>
	);
}

export default App;
