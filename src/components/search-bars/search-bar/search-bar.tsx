import { Component, ReactNode } from "react";

type TSearchBarProps = {
    placeholder: string,
    extendClass?: string,
}

type TSearchBarState = {

}

class SearchBar extends Component<TSearchBarProps, TSearchBarState> {
    constructor(props: TSearchBarProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <label className={`search-bar-container ${this.props.extendClass}`}>
                <input className="search-input-box" type="text" placeholder={this.props.placeholder} />
                <div className="search-icon-container">
                    <span className="search-icon">
                    </span>
                </div>
            </label>
        )
    }
}

export default SearchBar;