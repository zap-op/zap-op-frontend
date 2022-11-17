import { Component, ReactNode } from "react";
import BreadcrumbCell from "./breadcrumb-cell";

export type TBreadcrumbProps = {
    listBeadcrumb: {
        href: string;
        name: string;
    }[];
}

type TBreadcrumbState = {

}

class Breadcrumb extends Component<TBreadcrumbProps, TBreadcrumbState> {
    constructor(props: TBreadcrumbProps) {
        super(props);
    }
    override render(): ReactNode {
        return (
            <nav className="breadcrumb-container">
                <ol className="list-breadcrumb">
                    {this.props.listBeadcrumb.map((item) => {
                        return <BreadcrumbCell key={item.name} href={item.href} name={item.name} />
                    })}
                </ol>
            </nav>
        )
    }
}

export default Breadcrumb;