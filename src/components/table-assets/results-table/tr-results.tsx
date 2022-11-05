import { Component, createRef, ReactNode } from "react";
import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";
import SUB_TABLEROW_Results from "./sub-tr-results";

export type TTABLEROW_ResultsProps = {
    name: string;
    url: string;
    listScanType: (typeof ZAP.fullName |
        typeof TS_ZAP.fullName)[];
}

type TTABLEROW_Results_State = {
    isOpeningSubContent: boolean;
}

class TABLEROW_Results extends Component<TTABLEROW_ResultsProps, TTABLEROW_Results_State> {
    private ref_dropdownInput: React.RefObject<HTMLInputElement>;

    constructor(props: TTABLEROW_ResultsProps) {
        super(props);
        this.handleDropdownButton = this.handleDropdownButton.bind(this);
        this.ref_dropdownInput = createRef<HTMLInputElement>();
        this.state = {
            isOpeningSubContent: false,
        }
    }

    override componentDidMount(): void {
        this.fetchIsOpeningSubContentState();
    }

    private handleDropdownButton() {
        this.fetchIsOpeningSubContentState();
    }

    private fetchIsOpeningSubContentState(): void {
        this.setState({
            isOpeningSubContent: this.ref_dropdownInput.current?.checked ? true : false,
        })
    }

    override render(): ReactNode {
        return (
            <div className="trow-container">
                <ul className="trow">
                    <li className="dropdown">
                        <label className="dropdown-button button" onClick={this.handleDropdownButton}>
                            <input type="checkbox" className="checkbox-input" ref={this.ref_dropdownInput} />
                            <div className="arrow">
                            </div>
                        </label>
                    </li>
                    <li className="name">
                        {this.props.name}
                    </li>
                    <li className="target">
                        {this.props.url}
                    </li>
                    <li className="scan-types">
                        {this.props.listScanType.map((item) => {
                            return <span key={item} className="scan-type-item">
                                {item}
                            </span>
                        })}
                    </li>
                    <li className="action">

                    </li>
                </ul>
                <div className={`sub-trow-container ${this.state.isOpeningSubContent ? "is-opening" : ""}`}>
                    <div className="sub-trow-wrap">
                        <SUB_TABLEROW_Results scanType={ZAP.fullName} state={`SUCCEEDED`} progress={100} listExportResultType={["PDF", "XML"]} createdSince={"1 day ago"} />
                        <SUB_TABLEROW_Results scanType={ZAP.fullName} state={`SUCCEEDED`} progress={100} listExportResultType={["PDF", "XML"]} createdSince={"1 day ago"} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TABLEROW_Results;