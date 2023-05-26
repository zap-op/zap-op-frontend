import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddTargetsModal from "./AddTargetModal";
import CollapseSearchBar from "../SearchBars/CollapseSearchBar";
import TargetsTable from "./TargetsTable";
import { ModalContext } from "../toolkits/ModalPortal";
import { useGetTargetQuery } from "../../store";
import { useDebounceEffect } from "../../hooks";

const TargetsBoard = () => {
	const location = useLocation();
	const { data: listTarget } = useGetTargetQuery();

	const [listShowTarget, setListShowTarget] = useState<typeof listTarget>();
	const [inputSearch, setInputSearch] = useState<string>("");

	useDebounceEffect(
		() => {
			if (!inputSearch) {
				setListShowTarget(listTarget);
				return;
			}
			const listFiltered = listTarget?.filter((item) => {
				if (item && item.name) {
					return item.name.includes(inputSearch);
				}
				return false;
			});
			setListShowTarget(listFiltered);
		},
		[inputSearch],
		300,
	);

	useEffect(() => {
		if (!inputSearch) {
			setListShowTarget(listTarget);
			return;
		}
		const listFiltered = listTarget?.filter((item) => {
			if (item && item.name) {
				return item.name.includes(inputSearch);
			}
			return false;
		});
		setListShowTarget(listFiltered);
	}, [listTarget]);

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
					<CollapseSearchBar
						placeholder="Search target"
						handleChangeValue={setInputSearch}
					/>
					<div
						className="add-target-button button primary-button"
						onClick={handleAddTarget}>
						New target
					</div>
				</div>
				<div className="targets-board_targets-table-container">
					<TargetsTable listTarget={listShowTarget ? listShowTarget : []} />
				</div>
			</div>
		</>
	);
};

export default TargetsBoard;
