export type TBreadcrumbProps = {
	listBeadcrumb: {
		href: string;
		name: string;
	}[];
};

const Breadcrumb = (props: TBreadcrumbProps) => {
	return (
		<nav className="breadcrumb-container">
			<ol className="list-breadcrumb">
				{props.listBeadcrumb.map((item) => {
					return (
						<BreadcrumbCell
							key={item.name}
							href={item.href}
							name={item.name}
						/>
					);
				})}
			</ol>
		</nav>
	);
};

type TBreadcrumbCellProps = {
	href: string;
	name: string;
};

const BreadcrumbCell = (props: TBreadcrumbCellProps) => {
	return (
		<li className="breadcrumb-cell">
			<a
				className="breadcrumb-link"
				href={props.href}>
				<span className="breadcrumb-name">{props.name}</span>
			</a>
		</li>
	);
};

export default Breadcrumb;
