import { PropsWithChildren, useRef, useState } from "react";
import {
	useDispatch, //
	setDescribeInfo,
} from "../../../store";

type TDescribableProps = {
	dataTitle: string;
};

const Describable = (props: PropsWithChildren<TDescribableProps>) => {
	const TIME_TO_DESCRIBABLE = 500;

	const dispatch = useDispatch();

	const [waiterMouseStop, setWaiterMouseStop] = useState<number>();

	const ref_self = useRef<HTMLDivElement>(null);

	const handleMouseStop = () => {
		const clientRect = ref_self.current!.getBoundingClientRect();
		const presentOffsetTop = clientRect.bottom + 10;
		const presentOffsetLeft = clientRect.left + clientRect.width / 2;
		dispatch(
			setDescribeInfo({
				describeInfo: {
					offset: {
						top: presentOffsetTop,
						left: presentOffsetLeft,
					},
					title: props.dataTitle,
				},
			}),
		);
	};

	const handleMouseEnter = () => {
		clearTimeout(waiterMouseStop);
		setWaiterMouseStop(window.setTimeout(handleMouseStop, TIME_TO_DESCRIBABLE));
	};

	const handleMouseLeave = () => {
		clearTimeout(waiterMouseStop);
		dispatch(setDescribeInfo({ describeInfo: undefined }));
	};

	return (
		<div
			className="describable-wrap"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={ref_self}>
			{props.children}
		</div>
	);
};

export default Describable;
