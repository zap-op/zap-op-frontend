import { createRef, useEffect, useState } from 'react';
import ProgressBar from '../../progress-bar/progress-bar';

type TProgressTableProps = {
    tableBody: JSX.Element[];
    scanProgress: number;
    initAutoScrollState: boolean;
}

const ProgressTable = (props: TProgressTableProps) => {
    const [isActiveAutoScroll, setIsActiveAutoScroll] = useState<boolean>(false);

    const ref_autoScrollCheckbox = createRef<HTMLInputElement>();
    const ref_autoScrollContainer = createRef<HTMLDivElement>();
    const ref_tableBottomScroller = createRef<HTMLDivElement>();

    useEffect(() => {
        ref_autoScrollCheckbox.current!.checked = props.initAutoScrollState;
        updateIsActiveAutoScrollState();
    }, [])

    useEffect(() => {
        function handleOnTableChange() {
            if (typeof props.tableBody === "undefined" || !isActiveAutoScroll) {
                return;
            }
            ref_tableBottomScroller.current!.scrollIntoView({ behavior: "smooth" });
        }
        handleOnTableChange();
    }, [props.tableBody])

    const updateIsActiveAutoScrollState = () => {
        setIsActiveAutoScroll(ref_autoScrollCheckbox.current?.checked ? true : false);
    }

    const handleToggleAutoScrollCheckbox = () => {
        updateIsActiveAutoScrollState();
    }

    return (
        <>
            <ProgressBar scanProgress={props.scanProgress} />
            <div className="progress-table-container" >
                <div className="view-options-container">
                    <div className={`auto-scroll-container ${isActiveAutoScroll ? "" : "uncheck"}`} ref={ref_autoScrollContainer}>
                        <label className="auto-scroll toggle-button" htmlFor="auto-scroll-checkbox" onClick={handleToggleAutoScrollCheckbox}>
                            <input type="checkbox" className="checkbox-input" id="auto-scroll-checkbox" ref={ref_autoScrollCheckbox} />
                            <span className="toggle-track">
                                <span className="toggle-indicator">
                                    <span className="check-mark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden={true}>
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
                        {props.tableBody}
                        <div className="bottom-scroller" ref={ref_tableBottomScroller}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

ProgressTable.AUTO_SCROLL_ACTIVE = true;
ProgressTable.AUTO_SCROLL_DEACTIVE = false;

export default ProgressTable;