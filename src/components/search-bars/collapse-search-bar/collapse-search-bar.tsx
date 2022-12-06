import SearchBar from "../search-bar/search-bar";

type TCollapseSearchBarProps = {
    placeholder: string;
}

const CollapseSearchBar = (props:TCollapseSearchBarProps) => {
    return (
        <SearchBar placeholder={props.placeholder} extendClass="collapse-search-bar" />
    )
}

export default CollapseSearchBar;