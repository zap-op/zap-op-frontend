import { PropsWithChildren } from 'react';

type TSelectTargetTableProps = {
}

const SelectTargetTable = (props: PropsWithChildren<TSelectTargetTableProps>) => {
    return (
        <div className="select-target-table-container table-container">
            <div className="table-scroll-wrap">
                <div className="table-head-container">
                    <ul className="thead">
                        <li className="selected">
                            Select
                        </li>
                        <li className="name">
                            Name
                        </li>
                        <li className="target">
                            Target
                        </li>
                        <li className="tag">
                            Tag
                        </li>
                    </ul>
                </div>
                <div className="table-body-container">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default SelectTargetTable;