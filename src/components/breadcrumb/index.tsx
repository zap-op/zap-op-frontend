import BreadcrumbCell from "./breadcrumb-cell";

export type TBreadcrumbProps = {
    listBeadcrumb: {
        href: string;
        name: string;
    }[];
}

const Breadcrumb = (props:TBreadcrumbProps) => {
    return (
        <nav className="breadcrumb-container">
            <ol className="list-breadcrumb">
                {props.listBeadcrumb.map((item) => {
                    return <BreadcrumbCell key={item.name} href={item.href} name={item.name} />
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb;