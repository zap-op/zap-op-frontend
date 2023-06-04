import {
	useContext, //
	useEffect,
	useState,
} from "react";
import { useLocation } from "react-router-dom";
import AddTargetsModal from "./AddTargetModal";
import CollapseSearchBar from "../SearchBars/CollapseSearchBar";
import TargetsTable from "./TargetsTable";
import { ModalContext } from "../toolkits/ModalPortal";
import { useGetTargetQuery } from "../../store";
import {
	usePrevious, //
	useDebounceEffect,
} from "../../hooks";

const TargetsBoard = () => {
	const location = useLocation();
	const { data: listTarget } = useGetTargetQuery(undefined, {
		refetchOnFocus: true,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
	});

	const [listShowTarget, setListShowTarget] = useState<typeof listTarget>();
	const [inputSearch, setInputSearch] = useState<string>();
	const preInputSearch = usePrevious<typeof inputSearch>(inputSearch);

	const filterListShowTarget = () => {
		if (!inputSearch) {
			return;
		}
		const listFiltered = listShowTarget?.filter((item) => {
			if (item && item.name) {
				return item.name.includes(inputSearch);
			}
			return false;
		});
		setListShowTarget(listFiltered);
	};

	useDebounceEffect(
		() => {
			if (preInputSearch === inputSearch) {
				return;
			}
			if (inputSearch?.length === 0) {
				setListShowTarget(listTarget);
				return;
			}
			filterListShowTarget();
		},
		[inputSearch],
		300,
	);

	useEffect(() => {
		setListShowTarget(listTarget);
		filterListShowTarget();
	}, [listTarget]);

	const modalContext = useContext(ModalContext);

	const handleAddTarget = () => {
		location.state = null;
		modalContext?.setModalComponent(
			<ModalContext.Provider value={modalContext}>
				<AddTargetsModal />
			</ModalContext.Provider>,
		);
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
