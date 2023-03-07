import { PropsWithChildren } from 'react';

type TTargetsTableProps = {
}

const TargetsTable = (props: PropsWithChildren<TTargetsTableProps>) => {
    return (
        <div className="targets-table-container table-container">
            <div className="table-scroll-wrap">
                <div className="table-head-container">
                    <ul className="thead">
                        <li className="name">
                            Name
                        </li>
                        <li className="target">
                            Target
                        </li>
                        <li className="tag">
                            Tag
                        </li>
                        <li className="first-seen">
                            First seen
                        </li>
                        <li className="last-seen">
                            Last seen
                        </li>
                        <li className="action">
                            Actions
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

export default TargetsTable;