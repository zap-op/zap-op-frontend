import { useEffect, useRef } from "react";

type TConfigNode = {
	id: string;
	title: string;
	infor?: string;
	additionalInfor?: string;
	type: "number" | "checkbox";
	defaultValue?: number;
	min?: number;
	checked?: boolean;
	handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ConfigNode = ({
	id, //
	min,
	type,
	infor,
	title,
	checked,
	defaultValue,
	additionalInfor,
	handleChangeValue,
}: TConfigNode) => {
	const ref_inputCheckBox = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (type == "checkbox" && checked && ref_inputCheckBox != null && ref_inputCheckBox.current != null) {
			ref_inputCheckBox.current.checked = true;
		}
	}, []);

	return (
		<div className="config-node-container">
			<label htmlFor={id}>
				<h5 className="config-title">{title}</h5>
				{!!infor && <div className="config-description">{infor}</div>}
				<div className="input-container">
					{type == "number" ? ( //
						<input
							id={id}
							type={type}
							defaultValue={defaultValue}
							min={min}
							onChange={handleChangeValue}
						/>
					) : type == "checkbox" ? (
						<input
							ref={ref_inputCheckBox}
							id={id}
							type={type}
							onChange={handleChangeValue}
						/>
					) : (
						<></>
					)}
					{!!additionalInfor && <span className="input-infor">{additionalInfor}</span>}
				</div>
			</label>
		</div>
	);
};

export default ConfigNode;
