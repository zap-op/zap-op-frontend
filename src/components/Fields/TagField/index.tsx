import {
	useRef, //
	Dispatch,
	KeyboardEvent,
	PropsWithChildren,
	HTMLInputTypeAttribute,
} from "react";

type TTag = string;

type TListTag = TTag[];

type TTagFieldProps = {
	id: string;
	title?: string;
	placeHolder?: string;
	listSubmitTag: TListTag;
	listDataTag: TListTag;
	type: HTMLInputTypeAttribute;
	handleChangeValue: Dispatch<React.SetStateAction<TListTag>>;
};

const TagField = ({
	id, //
	type,
	title,
	placeHolder,
	listSubmitTag,
	listDataTag,
	handleChangeValue,
}: TTagFieldProps) => {
	const ref_input = useRef<HTMLInputElement>(null);

	const handleAddTag = (tag: TTag) => {
		if (!listSubmitTag.includes(tag)) {
			handleChangeValue([...listSubmitTag, tag]);
		}
	};

	const handleAddTagOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && ref_input.current && ref_input.current.value.length !== 0) {
			handleAddTag(ref_input.current.value);
			ref_input.current.value = "";
		}
	};

	const handleRemoveTag = (tag: TTag) => {
		handleChangeValue((prev) => {
			const indexToRemove = prev.indexOf(tag);
			if (indexToRemove !== -1) {
				return prev.splice(indexToRemove, 1);
			}
			return prev;
		});
	};

	return (
		<div className="field-container">
			{title && <h4>{title}</h4>}
			<label
				htmlFor={`label-${id}`}
				className="tag-field-container">
				<ul className="input">
					{listSubmitTag.map((tag) => (
						<TagItem handleRemoveSelf={() => handleRemoveTag(tag)}>{tag}</TagItem>
					))}

					<input
						ref={ref_input}
						id={`label-${id}`}
						type={type}
						list={`list-${id}`}
						placeholder={placeHolder}
						onKeyDown={handleAddTagOnEnter}
					/>
					<datalist id={`list-${id}`}>
						{listDataTag.map((tag) => (
							<option value={tag} />
						))}
					</datalist>
				</ul>
			</label>
		</div>
	);
};

export default TagField;

type TTagItem = {
	handleRemoveSelf: () => void;
};

const TagItem = ({
	children, //
	handleRemoveSelf,
}: PropsWithChildren<TTagItem>) => {
	return (
		<li>
			{children}
			<i
				className="close-button"
				onClick={handleRemoveSelf}></i>
		</li>
	);
};
