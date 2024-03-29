import { createRef, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Describable from "../toolkits/Describable";

type TProgressTableProps = {
	tableBody?: TItemRow[];
	options?: {
		progress?: {
			display?: boolean;
			scanProgress?: number;
		};
		autoScroll?: {
			display?: boolean;
			initState?: boolean;
		};
	};
};

const ProgressTable = ({
	tableBody, //
	options: {
		progress: {
			scanProgress = undefined, //
			display: displayProgress = undefined,
		} = {},
		autoScroll: {
			display: displayAutoScroll = undefined, //
			initState: initStateAutoScroll = undefined,
		} = {},
	} = {},
}: TProgressTableProps) => {
	const [isActiveAutoScroll, setIsActiveAutoScroll] = useState<boolean>(false);

	const ref_autoScrollCheckbox = createRef<HTMLInputElement>();
	const ref_autoScrollContainer = createRef<HTMLDivElement>();
	const ref_tableBottomScroller = createRef<HTMLDivElement>();

	useEffect(() => {
		if (!initStateAutoScroll) {
			return;
		}
		ref_autoScrollCheckbox.current!.checked = initStateAutoScroll;
		updateIsActiveAutoScrollState();
	}, []);

	useEffect(() => {
		function handleOnTableChange() {
			if (typeof tableBody === "undefined" || !isActiveAutoScroll) {
				return;
			}
			ref_tableBottomScroller.current!.scrollIntoView({
				behavior: "smooth",
			});
		}
		handleOnTableChange();
	}, [tableBody]);

	const updateIsActiveAutoScrollState = () => {
		setIsActiveAutoScroll(ref_autoScrollCheckbox.current?.checked ? true : false);
	};

	const handleToggleAutoScrollCheckbox = () => {
		updateIsActiveAutoScrollState();
	};

	return (
		<>
			{displayProgress && ( //
				<ProgressBar
					scanProgress={
						scanProgress //
							? scanProgress
							: 0
					}
				/>
			)}
			<div className="progress-table-container">
				<div className="view-options-container">
					{displayAutoScroll && (
						<div
							className={`auto-scroll-container ${
								isActiveAutoScroll //
									? ""
									: "uncheck"
							}`}
							ref={ref_autoScrollContainer}>
							<label
								className="auto-scroll toggle-button"
								htmlFor="auto-scroll-checkbox"
								onClick={handleToggleAutoScrollCheckbox}>
								<input
									type="checkbox"
									className="checkbox-input"
									id="auto-scroll-checkbox"
									ref={ref_autoScrollCheckbox}
								/>
								<span className="toggle-track">
									<span className="toggle-indicator">
										<span className="check-mark">
											<svg
												viewBox="0 0 24 24"
												id="ghq-svg-check"
												role="presentation"
												aria-hidden={true}>
												<path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
											</svg>
										</span>
									</span>
								</span>
							</label>
							<h4 className="option-title">Auto Scroll</h4>
						</div>
					)}
				</div>
				<div className="table-container">
					<div className="table-head-container">
						<ul className="thead">
							<li className="no">No.</li>
							<li className="url">Url Found</li>
						</ul>
					</div>
					<div className="table-body-container">
						{tableBody?.map((item, index) => (
							<ItemRow
								{...item}
								key={index}
							/>
						))}
						<div
							className="bottom-scroller"
							ref={ref_tableBottomScroller}></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProgressTable;

type TItemRow = {
	number: number;
	url: string;
};

const ItemRow = ({
	url, //
	number,
}: TItemRow) => {
	return (
		<ul className="trow">
			<li className="no">{number}</li>
			<li className="url">
				<Describable dataTitle={url}>
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer">
						{url}
					</a>
				</Describable>
			</li>
		</ul>
	);
};
