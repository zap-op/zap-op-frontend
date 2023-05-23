import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AddTargetsModal from "./AddTargetModal";
import CollapseSearchBar from "../SearchBars/CollapseSearchBar";
import TargetsTable from "./TargetsTable";
import { ModalContext } from "../toolkits/ModalPortal";

const TargetsBoard = () => {
	const location = useLocation();

	const modalContext = useContext(ModalContext);

	const handleAddTarget = () => {
		location.state = null;
		modalContext?.setModalComponent(<AddTargetsModal />);
		modalContext?.handleOpenModal(true);
	};

	return (
		<>
			<div className="targets-board-container">
				<div className="action-container">
					<CollapseSearchBar placeholder="Search target" />
					<div
						className="add-target-button button primary-button"
						onClick={handleAddTarget}>
						New target
					</div>
				</div>
				<div className="targets-board_targets-table-container">
					<TargetsTable />
				</div>
			</div>
		</>
	);
};

export default TargetsBoard;
