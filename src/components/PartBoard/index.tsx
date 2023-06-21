import { MouseEventHandler, PropsWithChildren, useRef, useState } from "react";

type TPartBoard = {
	title: string;
	extendClassName?: string;
};

const HEIGHT_COLLAPSED = "0px";

const PartBoard = ({
	title, //
	extendClassName,
	children,
}: PropsWithChildren<TPartBoard>) => {
	const ref_content = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(true);

	const handleTitleClick = () => {
		setIsOpen((pre) => !pre);
		if (isOpen) {
			ref_content.current?.style.setProperty("max-height", HEIGHT_COLLAPSED);
			return;
		}
		ref_content.current?.style.setProperty("max-height", ref_content.current?.scrollHeight + "px");
	};

	return (
		<div className={`part-board-container ${extendClassName && extendClassName}`}>
			<div
				className="title-container"
				onClick={handleTitleClick}>
				<h4 className="title">{title}</h4>
				<span className={`arrow ${isOpen && "active"}`}></span>
			</div>
			<hr />
			<div
				className="content"
				ref={ref_content}>
				{children}
			</div>
		</div>
	);
};

export default PartBoard;
