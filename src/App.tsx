import {
	Route, //
	Routes,
	Navigate,
	BrowserRouter,
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
} from "./components";

import { useSelector } from "./store";
import { useState } from "react";

function App() {
	const isAuth = useSelector((state) => state.auth.isAuth);

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null);

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
							path="wspsettings"
							element={<></>}
						/>
					</Route>
				</Routes>
				<ToolkitPortal />
				{isOpenModal ? <ModalPortal handleOpenModal={setIsOpenModal}>{modalComponent}</ModalPortal> : <></>}
			</BrowserRouter>
			<ToasterMgr />
		</div>
	);
}

export default App;
