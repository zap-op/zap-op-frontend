import { useEffect, useState } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

export type TBreadcrumbProps = {
	rootLink: TBreadcrumbCell;
};

const Breadcrumb = ({ rootLink }: TBreadcrumbProps) => {
	const location = useLocation();
	const [listCellBreadcrumb, setListCellBreadcrumb] = useState<TBreadcrumbCell[]>([]);

	useEffect(() => {
		const listPathCell = location.pathname.split("/").splice(2);
		const listBreadcrumbCell: TBreadcrumbCell[] = [rootLink].concat(
			listPathCell.map((item) => ({
				href: item,
				name: item,
			})),
		);
		listBreadcrumbCell.forEach((item, index, arr) => {
			arr[index].href =
				"../" +
				arr
					.slice(0, index + 1)
					.map((item) => item.href)
					.join("/");
		});
		setListCellBreadcrumb(listBreadcrumbCell);
	}, [location]);

	return (
		<nav className="breadcrumb-container">
			<ol className="list-breadcrumb">
				{listCellBreadcrumb.map((item) => (
					<BreadcrumbCell
						key={item.name}
						href={item.href}
						name={item.name}
					/>
				))}
			</ol>
		</nav>
	);
};

type TBreadcrumbCell = {
	href: LinkProps["to"];
	name: string;
};

const BreadcrumbCell = ({
	href, //
	name,
}: TBreadcrumbCell) => {
	return (
		<li className="breadcrumb-cell">
			<Link
				className="breadcrumb-link"
				to={href}>
				<span className="breadcrumb-name">{name}</span>
			</Link>
		</li>
	);
};

export default Breadcrumb;
