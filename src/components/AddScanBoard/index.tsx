import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDigestTargetsWithOptions } from "../../hooks";
import { useSelector } from "../../store";
import NavStep from "./NavStep";
import SelectTargetBoard from "./SelectTargetBoard";
import ScanOptionsBoard from "./ScanOptionsBoard";
import ScanConfigBoard from "./ScanConfigBoard";

export enum AddScanBoardLinkState {
	SelectTarget = "select-target",
	ScanOptions = "scan-options",
	ScanConfig = "scan-config",
}

const CONFIG_STEPS = [
	{
		title: "Select Targets",
		state: AddScanBoardLinkState.SelectTarget,
	},
	{
		title: "Select Options",
		state: AddScanBoardLinkState.ScanOptions,
	},
	{
		title: "Configure Options",
		state: AddScanBoardLinkState.ScanConfig,
	},
];

const AddScanBoard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { digest } = useDigestTargetsWithOptions();
	const [previousLinkState, setPreviousLinkState] = useState<string>("");
	const [currentLinkState, setCurrentLinkState] = useState<string>("");
	let currentLinkStateIndex = 0;
	const [nextLinkState, setNextLinkState] = useState<string>("");

	useEffect(() => {
		if (location.state !== null) {
			currentLinkStateIndex = CONFIG_STEPS.findIndex((item) => item.state === location.state);
		}
		if (currentLinkStateIndex > 0) {
			setPreviousLinkState(CONFIG_STEPS[currentLinkStateIndex - 1].state);
		} else {
			setPreviousLinkState("");
		}
		if (currentLinkStateIndex < CONFIG_STEPS.length - 1) {
			setNextLinkState(CONFIG_STEPS[currentLinkStateIndex + 1].state);
		} else {
			setNextLinkState("");
		}
		setCurrentLinkState(CONFIG_STEPS[currentLinkStateIndex].state);
	}, [location.state]);

	const scanOption = useSelector((state) => state.target.scanOption);
	const [isAbleToConfigure, setIsAbleToConfigure] = useState<boolean>(false);

	useEffect(() => {
		if (scanOption.spider || scanOption.ajax || scanOption.passive.checked || scanOption.active.checked) {
			setIsAbleToConfigure(true);
			return;
		}
		setIsAbleToConfigure(false);
	}, [scanOption]);

	const handleStartScanWithOptions = () => {
		digest().then(() => {
			navigate("../results");
		});
	};

	return (
		<div className="add-scan-board-container">
			<div className="add-scan-board_step-nav-container">
				<NavStep steps={CONFIG_STEPS} />
			</div>
			<div className="add-scan-board_content-container">
				{currentLinkState == AddScanBoardLinkState.SelectTarget ? ( //
					<SelectTargetBoard />
				) : currentLinkState == AddScanBoardLinkState.ScanOptions ? (
					<ScanOptionsBoard />
				) : currentLinkState == AddScanBoardLinkState.ScanConfig ? (
					<ScanConfigBoard />
				) : (
					<></>
				)}
			</div>
			{currentLinkState == AddScanBoardLinkState.ScanOptions && ( //
				<div className="additional-description is-required">Select any options to able to configure details</div>
			)}
			<div className="navigator-state-containter">
				<div className="group-navigate-left">
					{previousLinkState ? (
						<Link
							to=""
							state={previousLinkState}
							className="previous-state button secondary-button link-button"
							draggable={false}>
							Back
						</Link>
					) : (
						<></>
					)}
				</div>
				<div className="group-navigate-right">
					{currentLinkState == AddScanBoardLinkState.ScanOptions && ( //
						<div
							className="start-with-default-state button secondary-button"
							onClick={handleStartScanWithOptions}>
							Start with Default
						</div>
					)}
					{nextLinkState ? (
						<Link
							to=""
							state={nextLinkState}
							className={`next-state button primary-button link-button ${currentLinkState == AddScanBoardLinkState.ScanOptions && !isAbleToConfigure ? "disable-button" : ""}`}
							draggable={false}>
							Next
						</Link>
					) : (
						<div
							className="start-state button primary-button"
							onClick={handleStartScanWithOptions}>
							Start
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddScanBoard;
