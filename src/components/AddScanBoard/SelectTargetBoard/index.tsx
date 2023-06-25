import { useEffect, useState } from "react";
import SearchBar from "../../SearchBars/SearchBar";
import SelectTargetTable from "./SelectTargetTable";
import { useGetTargetQuery } from "../../../store";
import { useDebounceEffect, usePrevious } from "../../../hooks";

const SelectTargetBoard = () => {
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

	return (
		<div className="select-target-container">
			<h1 className="title">Select Targets</h1>
			<div className="list-selection-container">
				<SearchBar
					placeholder="Search target"
					handleChangeValue={setInputSearch}
				/>
				<SelectTargetTable
					listChild={listShowTarget ? listShowTarget : []}
					heightScrollWrap="45vh"
				/>
			</div>
		</div>
	);
};

export default SelectTargetBoard;
