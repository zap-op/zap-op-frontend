import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export type TNodeStepProps = {
	title: string;
	state: string;
	startNode?: boolean;
};

const NodeStep = (props: TNodeStepProps) => {
	const location = useLocation();
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		if (location.state === null && props.startNode) {
			setIsActive(true);
		} else if (location.state === props.state) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [location.state]);

	return (
		<div className={`node-step-container ${isActive ? "isActive" : undefined}`}>
			<div className="node-container">
				<NavLink
					to=""
					state={props.state}
					draggable={false}>
					<div className="node"></div>
				</NavLink>
			</div>
			<div className="title-container">
				<h4>{props.title}</h4>
			</div>
		</div>
	);
};

export default NodeStep;
