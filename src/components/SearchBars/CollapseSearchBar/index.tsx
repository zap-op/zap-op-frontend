import SearchBar, { TSearchBarProps } from "../SearchBar";

type TCollapseSearchBarProps = Omit<TSearchBarProps, "extendClass">;

const CollapseSearchBar = ({ placeholder, handleChangeValue }: TCollapseSearchBarProps) => {
	return (
		<SearchBar
			placeholder={placeholder}
			extendClass="collapse-search-bar"
			handleChangeValue={handleChangeValue}
		/>
	);
};

export default CollapseSearchBar;
