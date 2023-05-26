import { Dispatch } from "react";

export type TSearchBarProps = {
	placeholder: string;
	extendClass?: string;
	handleChangeValue: Dispatch<React.SetStateAction<any | undefined>>;
};

const SearchBar = ({ placeholder, extendClass, handleChangeValue }: TSearchBarProps) => {
	return (
		<label className={`search-bar-container ${extendClass}`}>
			<input
				className="search-input-box"
				type="text"
				placeholder={placeholder}
				onChange={(event) => handleChangeValue(event.target.value)}
			/>
			<div className="search-icon-container">
				<span className="search-icon"></span>
			</div>
		</label>
	);
};

export default SearchBar;
