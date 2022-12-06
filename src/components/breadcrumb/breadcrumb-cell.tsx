type TBreadcrumbCellProps = {
    href: string;
    name: string;
}

const BreadcrumbCell = (props:TBreadcrumbCellProps) => {
    return (
        <li className="breadcrumb-cell">
            <a className="breadcrumb-link" href={props.href}>
                <span className="breadcrumb-name">
                    {props.name}
                </span>
            </a>
        </li>
    )
}

export default BreadcrumbCell;