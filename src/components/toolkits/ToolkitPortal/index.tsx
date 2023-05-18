import { useSelector } from "../../../store/store";
import DescribeElement from "../Describable/DescribeElement";

const ToolkitPortal = () => {
	const isDescribing = useSelector((state) => state.describablePortal.isDescribing);
	const describeInfo = useSelector((state) => state.describablePortal.describeInfo);

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
