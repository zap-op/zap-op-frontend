import { PropsWithChildren, useRef, useState } from "react";
import { setDescribeInfo } from "../../../store/slice/toolkit/describablePortalSlice";
import { useDispatch } from "react-redux";

type TDescribableProps = {
	dataTitle: string;
};

const Describable = (props: PropsWithChildren<TDescribableProps>) => {
	const TIME_TO_DESCRIBABLE = 500;

	const dispatch = useDispatch();

	const [waiterMouseStop, setWaiterMouseStop] = useState<number>();

	const ref_self = useRef<HTMLDivElement>(null);

	const handleMouseStop = () => {
		const presentOffsetTop = ref_self.current!.offsetTop + ref_self.current!.offsetHeight / 2;
		const presentOffsetLeft = ref_self.current!.offsetLeft + ref_self.current!.offsetWidth / 2;
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
		setWaiterMouseStop(setTimeout(handleMouseStop, TIME_TO_DESCRIBABLE));
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
