import SearchBar from "../SearchBar";

type TCollapseSearchBarProps = {
	placeholder: string;
};

const CollapseSearchBar = (props: TCollapseSearchBarProps) => {
	return (
		<SearchBar
			placeholder={props.placeholder}
			extendClass="collapse-search-bar"
		/>
	);
};

export default CollapseSearchBar;
