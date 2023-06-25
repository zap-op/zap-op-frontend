import { useState } from "react";
import { useGetTargetQuery } from "../../../store";
import SearchBar from "../../SearchBars/SearchBar";
import SelectTargetTable from "./SelectTargetTable";

const SelectTargetBoard = () => {
	const [inputSearch, setInputSearch] = useState<string>();
	const { data: listTarget } = useGetTargetQuery();

	return (
		<div className="select-target-container">
			<h1 className="title">Select Targets</h1>
			<div className="list-selection-container">
				<SearchBar
					placeholder="Search target"
					handleChangeValue={setInputSearch}
				/>
				<SelectTargetTable
					listChild={listTarget ? listTarget : []}
					heightScrollWrap="45vh"
				/>
			</div>
		</div>
	);
};

export default SelectTargetBoard;
