import { useEffect, useRef } from "react";
import NodeStep, { TNodeStepProps } from "./NodeStep";

export type TNavStepProps = {
	steps: TNodeStepProps[];
};

const NavStep = (props: TNavStepProps) => {
	const ref_self = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const stepLength = props.steps.length;
		const marginValue = 100 / (stepLength * 2);
		ref_self.current?.style.setProperty("--linker-margin-left-right", `${marginValue}%`);
	}, []);

	return (
		<div
			className="nav-step-container"
			ref={ref_self}>
			{props.steps.map((item, index) => {
				return (
					<NodeStep
						key={index}
						title={item.title}
						state={item.state}
						startNode={index === 0 ? true : false}
					/>
				);
			})}
		</div>
	);
};

export default NavStep;
