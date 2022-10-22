import { Component, createRef } from 'react';
import ProgressBar from '../progress-bar';

type TProgressTableProps = {
    tableBody: JSX.Element[];
    scanProgress: number;
    autoScrollState: boolean;
}

class ProgressTable extends Component<TProgressTableProps> {
    static readonly AUTO_SCROLL_ACTIVE = true;
    static readonly AUTO_SCROLL_DEACTIVE = false;

    private ref_autoScrollCheckbox: React.RefObject<HTMLInputElement>;
    private ref_autoScrollContainer: React.RefObject<HTMLDivElement>;
    private ref_tableBottomScroller: React.RefObject<HTMLDivElement>;

    constructor(props: TProgressTableProps) {
        super(props);
        // this.onToggleAutoScrollCheckboxHandler = this.onToggleAutoScrollCheckboxHandler.bind(this);

        this.ref_autoScrollCheckbox = createRef<HTMLInputElement>();
        this.ref_autoScrollContainer = createRef<HTMLDivElement>();
        this.ref_tableBottomScroller = createRef<HTMLDivElement>();
    }

    override componentDidMount() {
        this.setAutoScrollCheckBox(this.props.autoScrollState);
        this.onTableChangeHandler(this.props);
    }

    override componentDidUpdate(prevProps: TProgressTableProps) {
        this.onTableChangeHandler(prevProps);
    }

    private onTableChangeHandler(prevProps: TProgressTableProps) {
        if (this.isTableBodyEmpty() || !this.ref_autoScrollCheckbox.current!.checked) {
            return;
        }
        if (this.props.tableBody.length !== prevProps.tableBody.length) {
            this.scrollToBottomTable();
        }
    }

    private scrollToBottomTable() {
        this.ref_tableBottomScroller.current!.scrollIntoView({ behavior: "smooth" })
    }

    private isTableBodyEmpty() {
        if (typeof this.props.tableBody === "undefined") {
            return true;
        }
        return false;
    }

    setAutoScrollCheckBox(status: boolean) {
        this.ref_autoScrollCheckbox.current!.checked = status;
    }

    override render() {
        return (
            <>
                <ProgressBar scanProgress={this.props.scanProgress} />
                <div className="progress-table-container" >
                    <div className="view-options-container">
                        <div className={`auto-scroll-container ${this.ref_autoScrollCheckbox.current?.checked ? "" : "uncheck"}`} ref={this.ref_autoScrollContainer}>
                            <label className="auto-scroll toggle-button" htmlFor="auto-scroll-checkbox">
                                <input type="checkbox" className="checkbox-input" id="auto-scroll-checkbox" ref={this.ref_autoScrollCheckbox} />
                                <span className="toggle-track">
                                    <span className="toggle-indicator">
                                        <span className="check-mark">
                                            <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                                <path
                                                    d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z">
                                                </path>
                                            </svg>
                                        </span>
                                    </span>
                                </span>
                            </label>
                            <h4 className="option-title">
                                Auto Scroll
                            </h4>
                        </div>
                    </div>
                    <div className="table-container">
                        <div className="table-scroll-wrap">
                            <div className="table-head-container">
                                <ul className="thead">
                                    <li className="no">
                                        No.
                                    </li>
                                    <li className="url">
                                        Url Found
                                    </li>
                                </ul>
                            </div>
                            <div className="table-body-container">
                                {this.props.tableBody}
                                <div className="bottom-scroller" ref={this.ref_tableBottomScroller}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ProgressTable;