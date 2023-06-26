import { useEffect, useState } from "react";
import PartBoard from "../../PartBoard";
import Describable from "../../toolkits/Describable";
import {
	TBaseUrlResult, //
	TZapAjaxScanFullResults,
} from "../../../utils/types";

export type TListUrlByMethod = {
	method: string;
	value: {
		url: string;
		statusCode: string;
	}[];
};

export const transformListUrl2ListUrlByMethod = (listUrl: TBaseUrlResult[]) => {
	if (listUrl.length === 0) {
		return [];
	}
	const listUrlByMethod: TListUrlByMethod[] = [];

	listUrlByMethod.push({
		method: listUrl[0].method,
		value: [],
	});

	listUrl.forEach((item) => {
		let isAdded = false;
		for (const itemByMethod of listUrlByMethod) {
			if (item.method === itemByMethod.method) {
				itemByMethod.value.push({
					url: item.url,
					statusCode: item.statusCode,
				});
				isAdded = true;
				break;
			}
		}
		if (!isAdded) {
			listUrlByMethod.push({
				method: item.method,
				value: [
					{
						url: item.url,
						statusCode: item.statusCode,
					},
				],
			});
		}
	});

	return listUrlByMethod;
};

const ZapAjaxFullResultTable = ({
	inScope, //
	outOfScope,
	errors,
}: TZapAjaxScanFullResults["fullResults"]) => {
	const [fullResultsTransformed, setFullResultsTransformed] = useState<{
		inScope: TListUrlByMethod[];
		outOfScope: TListUrlByMethod[];
		errors: any[];
	}>();

	useEffect(() => {
		const listUrlInScope: TListUrlByMethod[] = transformListUrl2ListUrlByMethod(inScope);
		const listUrlOutOfScope: TListUrlByMethod[] = transformListUrl2ListUrlByMethod(outOfScope);

		setFullResultsTransformed({
			inScope: listUrlInScope,
			outOfScope: listUrlOutOfScope,
			errors,
		});
	}, []);

	return (
		<div className="ajax table-scroll-wrap table-container">
			{fullResultsTransformed && (
				<>
					{fullResultsTransformed.inScope.length != 0 && (
						<PartBoardURLS
							title="URLS In Scope"
							listUrlByMethod={fullResultsTransformed.inScope}
						/>
					)}
					{fullResultsTransformed.outOfScope.length!= 0 && (
						<PartBoardURLS
							title="URLS Out Of Scope"
							listUrlByMethod={fullResultsTransformed.outOfScope}
						/>
					)}
				</>
			)}
		</div>
	);
};

type TPartBoardURLS = {
	title: string;
	listUrlByMethod: TListUrlByMethod[];
};

export const PartBoardURLS = ({
	title, //
	listUrlByMethod,
}: TPartBoardURLS) => (
	<PartBoard title={title}>
		{listUrlByMethod.map((item, index) => {
			return (
				<div
					key={index}
					className="detail-block">
					<ul className="trow">
						<li className="label">Method</li>
						<li className="detail">{item.method}</li>
					</ul>
					{item.value.map((urlItem, index) => {
						return (
							<div
								key={index}
								className="instance detail-block">
								<span className="instance-index">{index}</span>
								<ul className="trow">
									<li className="label">URL</li>
									<li className="detail">
										<Describable dataTitle={urlItem.url}>
											<a
												href={urlItem.url}
												target="_blank"
												rel="noopener noreferrer">
												{urlItem.url}
											</a>
										</Describable>
									</li>
								</ul>
								<ul className="trow">
									<li className="label">Status Code</li>
									<li className="detail">{urlItem.statusCode}</li>
								</ul>
							</div>
						);
					})}
				</div>
			);
		})}
	</PartBoard>
);

export default ZapAjaxFullResultTable;
