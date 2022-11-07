import { Component, ReactNode } from "react";

export type TTABLEROW_TargetAdded_Props = {
    onClick?: React.MouseEventHandler;
    isSelected: boolean;
    name: string;
    url: string;
    tag: string;
}

class TABLEROW_TargetAdded extends Component<TTABLEROW_TargetAdded_Props> {
    constructor(props: TTABLEROW_TargetAdded_Props) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <ul className="trow" onClick={this.props.onClick}>
                <li className="selected">
                    <div className="selection-container">
                        <input type="checkbox" name="select-row" id="" />
                    </div>
                </li>
                <li className="name">
                    {this.props.name}
                </li>
                <li className="target">
                    {this.props.url}
                </li>
                <li className="tag">
                    {this.props.tag}
                </li>
            </ul>
        )
    }
}

export default TABLEROW_TargetAdded;