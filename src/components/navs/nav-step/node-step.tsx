import { NavLink, useLocation } from "react-router-dom";

export type TNodeStepProps = {
    title: string;
    state: string;
    startNode?: boolean;
}

const NodeStep = (props: TNodeStepProps) => {
    const location = useLocation();
    let isActive: boolean = false;
    if (location.state && props.startNode) {
        isActive = true;
    } else if (location.state === props.state) {
        isActive = true;
    }
    return (
        <div className={`node-step-container ${isActive ? "isActive" : undefined}`}>
            <div className="node-container">
                <NavLink
                    to=""
                    state={props.state}
                    draggable={false}>
                    <div className="node">
                    </div>
                </NavLink>
            </div>
            <div className="title-container">
                <h4>
                    {props.title}
                </h4>
            </div>
        </div>
    );
}

export default NodeStep;