import { Component, ReactNode } from "react";

type TBreadcrumbCellProps = {
    href: string;
    name: string;
}

type TBreadcrumbCellState = {

}

class BreadcrumbCell extends Component<TBreadcrumbCellProps, TBreadcrumbCellState> {
    constructor(props: TBreadcrumbCellProps) {
        super(props);
    }
    override render(): ReactNode {
        return (
            <li className="breadcrumb-cell">
                <a className="breadcrumb-link" href={this.props.href}>
                    <span className="breadcrumb-name">
                        {this.props.name}
                    </span>
                </a>
            </li>
        )
    }
}

export default BreadcrumbCell;