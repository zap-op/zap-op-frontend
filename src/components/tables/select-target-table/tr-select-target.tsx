import { Component, createRef, ReactNode } from "react";

export type TTABLEROW_SelectTarget_Props = {
    name: string;
    url: string;
    tag: string;
}

class TABLEROW_SelectTarget extends Component<TTABLEROW_SelectTarget_Props> {
    private ref_targetSelector: React.RefObject<HTMLInputElement>;
    
    constructor(props: TTABLEROW_SelectTarget_Props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.ref_targetSelector = createRef<HTMLInputElement>();
    }

    handleSelect() {
        this.ref_targetSelector.current!.checked = !this.ref_targetSelector.current!.checked;
    }

    override render(): ReactNode {
        return (
            <ul className="trow" onClick={this.handleSelect}>
                <li className="selected">
                    <div className="selection-container">
                        <input className="target-selector" type="checkbox" name="select-row" id="" ref={this.ref_targetSelector} />
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

export default TABLEROW_SelectTarget;