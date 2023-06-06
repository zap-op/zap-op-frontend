import { Dispatch, HTMLInputTypeAttribute, useEffect, useRef } from "react";

type TTagFieldProps = {
	id: string;
	title?: string;
	placeHolder?: string;
	type: HTMLInputTypeAttribute;
	handleChangeValue: Dispatch<React.SetStateAction<any | undefined>>;
};

const TagField = ({
	id, //
	type,
	title,
	placeHolder,
	handleChangeValue,
}: TTagFieldProps) => {
	return (
		<div className="field-container">
			{title && <h4>{title}</h4>}
			<label
				htmlFor={id}
				className="tag-field-container">
				<ul className="input">
					{/* <li>
						1
						<i className="close-button"></i>
					</li> */}

					<input
						id={id}
						type={type}
						list="test"
						placeholder={placeHolder}
						onChange={(event) => handleChangeValue(event.target.value)}
					/>
					<datalist id="test">
						<option value={1} />
					</datalist>
				</ul>
			</label>
		</div>
	);
};

export default TagField;
