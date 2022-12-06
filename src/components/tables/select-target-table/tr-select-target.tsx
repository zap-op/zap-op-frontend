import { createRef } from "react";

export type TTABLEROW_SelectTarget_Props = {
    name: string;
    url: string;
    tag: string;
}

const TABLEROW_SelectTarget = (props: TTABLEROW_SelectTarget_Props) => {
    const ref_targetSelector = createRef<HTMLInputElement>();

    const handleSelect = () => {
        ref_targetSelector.current!.checked = !ref_targetSelector.current!.checked;
    }

    return (
        <ul className="trow" onClick={handleSelect}>
            <li className="selected">
                <div className="selection-container">
                    <input className="target-selector" type="checkbox" name="select-row" id="" ref={ref_targetSelector} />
                </div>
            </li>
            <li className="name">
                {props.name}
            </li>
            <li className="target">
                {props.url}
            </li>
            <li className="tag">
                {props.tag}
            </li>
        </ul>
    )
}

export default TABLEROW_SelectTarget;