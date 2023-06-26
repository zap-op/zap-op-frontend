import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FONT_SIZE } from "../../utils/styleMgr";
import { createPortal } from "react-dom";

export type TOptionItem = {
	name: string;
	handle?: () => void;
};

type TMoreOptionsButtonProps = {
	listOptions: TOptionItem[];
	style?: {
		isIsolate?: boolean;
		relativeHeight?: number;
		parentIdContainPortal?: string;
	};
};

const MoreOptionsButton = ({
	style, //
	listOptions,
}: TMoreOptionsButtonProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const ref_self = useRef<HTMLDivElement>(null);
	const ref_portal = useRef<HTMLDivElement>(null);

	const [portalTopPosition, setPortalTopPosition] = useState<number>(0);
	const [parentContainPortal, setParentContainPortal] = useState<HTMLElement>();

	useEffect(() => {
		if (!ref_self.current) {
			return;
		}
		setParentContainPortal(document.getElementById(style?.parentIdContainPortal || "") || undefined);
		const self = ref_self.current;
		setPortalTopPosition(self.offsetTop + self.offsetHeight);
	}, []);

	const handleClickOpen = () => {
		if (isOpen) {
			return;
		}
		document.addEventListener("mousedown", handleClickOutside);
		setIsOpen(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (ref_portal.current && ref_portal.current.contains(event.target as Node)) {
			return;
		}
		handleCloseOptions();
	};

	const handleCloseOptions = () => {
		setIsOpen(false);
		document.removeEventListener("mousedown", handleClickOutside);
	};

	return (
		<div
			ref={ref_self}
			className={`more-options-button ${style?.isIsolate && `isolate ${isOpen && "clicked"}`}`}
			onClick={handleClickOpen}>
			<div className="three-dot">
				{/* ellipsis-solid.svg */}
				<svg
					height={`${1.25 * FONT_SIZE}px`}
					width={`${1.25 * FONT_SIZE}px`}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512">
					{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
					<path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
				</svg>
			</div>
			{isOpen &&
				parentContainPortal &&
				createPortal(
					<div
						ref={ref_portal}
						className="more-options-portal options"
						style={{
							right: 0,
							top: portalTopPosition + "px",
						}}>
						{listOptions.map((item) => (
							<span
								key={item.name}
								className="option-item"
								onClick={() => {
									if (!item.handle) {
										return;
									}
									item.handle();
									handleCloseOptions();
								}}>
								{item.name}
							</span>
						))}
					</div>,
					parentContainPortal,
				)}
		</div>
	);
};

export default MoreOptionsButton;
