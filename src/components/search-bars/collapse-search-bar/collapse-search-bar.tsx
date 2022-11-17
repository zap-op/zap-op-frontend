import { Component, ReactNode } from "react";
import SearchBar from "../search-bar/search-bar";

type TCollapseSearchBarProps = {
    placeholder: string;
}

type TCollapseSearchBarState = {

}

class CollapseSearchBar extends Component<TCollapseSearchBarProps, TCollapseSearchBarState> {
    constructor(props: TCollapseSearchBarProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <SearchBar placeholder={this.props.placeholder} extendClass="collapse-search-bar" />
        )
    }
}

export default CollapseSearchBar;