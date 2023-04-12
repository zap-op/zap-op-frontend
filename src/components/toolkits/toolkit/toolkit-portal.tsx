import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import DescribeElement from "../describable/describe-element";

const ToolkitPortal = () => {
	const isDescribing = useSelector((state: RootState) => state.describablePortal.isDescribing);
	const describeInfo = useSelector((state: RootState) => state.describablePortal.describeInfo);

	return (
		<div className="toolkit-portal">
			{isDescribing ? (
				<DescribeElement
					offsetTop={describeInfo!.offset.top}
					offsetLeft={describeInfo!.offset.left}>
					{describeInfo?.title}
				</DescribeElement>
			) : (
				<></>
			)}
		</div>
	);
};

export default ToolkitPortal;
