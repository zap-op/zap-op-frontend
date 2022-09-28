import React, { Component } from 'react';
import $ from 'jquery';
import ProgressBar from '../components/progress-bar';


class ProgressTable extends Component {
    static AUTO_SCROLL_ACTIVE = true;
    static AUTO_SCROLL_DEACTIVE = false;

    constructor(props) {
        super(props);
        this.onToggleAutoScrollCheckboxHandler = this.onToggleAutoScrollCheckboxHandler.bind(this);
        this.onTableChangeHandler = this.onTableChangeHandler.bind(this);
        this.scrollToBottomTable = this.scrollToBottomTable.bind(this);
        this.setAutoScrollCheckBox = this.setAutoScrollCheckBox.bind(this);
        this.isTableBodyEmpty = this.isTableBodyEmpty.bind(this);
        this.ref_autoScrollCheckbox = React.createRef();
        this.ref_autoScrollContainer = React.createRef();
        this.ref_tableBottomScroller = React.createRef();
    }

    componentDidMount() {
        this.setAutoScrollCheckBox(this.props.autoScrollState);
        this.onTableChangeHandler(this.props);
    }

    componentDidUpdate(prevProps) {
        this.onTableChangeHandler(prevProps);
    }

    onTableChangeHandler(prevProps) {
        if (this.isTableBodyEmpty() || !this.ref_autoScrollCheckbox.current.checked) {
            return;
        }
        if (this.props.tableBody.length != prevProps.tableBody.length) {
            this.scrollToBottomTable();
        }
    }

    onToggleAutoScrollCheckboxHandler() {
        $(this.ref_autoScrollContainer.current).toggleClass("uncheck")
    }

    isTableBodyEmpty() {
        if (typeof this.props.tableBody === "undefined") {
            return true;
        }
        return false;
    }

    scrollToBottomTable() {
        this.ref_tableBottomScroller.current.scrollIntoView({ behavior: "smooth" })
    }

    setAutoScrollCheckBox(status) {
        if (!typeof status === "boolean") {
            return;
        }
        this.ref_autoScrollCheckbox.current.checked = status;
    }

    render() {
        return (
            <>
                <ProgressBar />
                <div className="progress-table-container" >
                    <div className="view-options-container">
                        <div className="auto-scroll-container" ref={this.ref_autoScrollContainer}>
                            <label className="auto-scroll toggle-button" htmlFor="auto-scroll-checkbox">
                                <input type="checkbox" className="checkbox-input" id="auto-scroll-checkbox" onClick={this.onToggleAutoScrollCheckboxHandler} ref={this.ref_autoScrollCheckbox} />
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
                                {this.props.tableHead}
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