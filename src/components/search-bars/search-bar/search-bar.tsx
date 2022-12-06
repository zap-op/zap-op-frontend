type TSearchBarProps = {
    placeholder: string,
    extendClass?: string,
}

const SearchBar = (props: TSearchBarProps) => {
    return (
        <label className={`search-bar-container ${props.extendClass}`}>
            <input className="search-input-box" type="text" placeholder={props.placeholder} />
            <div className="search-icon-container">
                <span className="search-icon">
                </span>
            </div>
        </label>
    )
}

export default SearchBar;