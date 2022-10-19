import { Component, ReactNode } from "react";

type TSearchBarProps = {
    placeholder: string;
}

type TSearchBarState = {

}

class SearchBar extends Component<TSearchBarProps, TSearchBarState> {
    constructor(props: TSearchBarProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="search-bar-container">
                <input className="search-input-box" type="text" placeholder={this.props.placeholder} />
                <div className="search-icon-container">
                    <span className="search-icon">
                    </span>
                </div>
            </div>
        )
    }
}

export default SearchBar;