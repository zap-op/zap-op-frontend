import { useEffect, useState } from "react";
import { useGetAjaxFullResultQuery } from "../../../store";
import { TZapAjaxFullResultGETRequest, TZapAjaxScanFullResults } from "../../../utils/types";
import PartBoard from "../../PartBoard";
import Describable from "../../toolkits/Describable";

type TListUrlByMethod = {
	method: string;
	value: {
		url: string;
		statusCode: string;
	}[];
};

const ZapAjaxFullResultTable = ({
	_id,
	liftUpDataCallback,
}: TZapAjaxFullResultGETRequest & {
	liftUpDataCallback: (data: TZapAjaxScanFullResults["fullResults"]) => void;
}) => {
	const result = useGetAjaxFullResultQuery({
		_id,
	});

	const [fullResultsTransformed, setFullResultsTransformed] = useState<{
		inScope: TListUrlByMethod[];
		outOfScope: TListUrlByMethod[];
		errors: any[];
	}>();

	useEffect(() => {
		if (!result.data) {
			return;
		}

		liftUpDataCallback(result.data.fullResults);

		const {
			fullResults: {
				inScope, //
				outOfScope,
				errors,
			},
		} = result.data;

		const listUrlInScope: TListUrlByMethod[] = [];
		const listUrlOutOfScope: TListUrlByMethod[] = [];

		if (inScope.length !== 0) {
			listUrlInScope.push({
				method: inScope[0].method,
				value: [],
			});

			inScope.forEach((item) => {
				let isAdded = false;
				for (const itemByMethod of listUrlInScope) {
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
					listUrlInScope.push({
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
		}

		if (outOfScope.length !== 0) {
			listUrlOutOfScope.push({
				method: outOfScope[0].method,
				value: [],
			});

			outOfScope.forEach((item) => {
				let isAdded = false;
				for (const itemByMethod of listUrlOutOfScope) {
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
					listUrlOutOfScope.push({
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
		}
		setFullResultsTransformed({
			inScope: listUrlInScope,
			outOfScope: listUrlOutOfScope,
			errors,
		});
	}, [result.data]);

	return (
		<>
			{fullResultsTransformed && (
				<div className="ajax table-scroll-wrap table-container">
					{fullResultsTransformed.inScope.length !== 0 && (
						<PartBoard title="URLS In Scope">
							{fullResultsTransformed!.inScope.map((item, index) => {
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
					)}
					{fullResultsTransformed.outOfScope.length !== 0 && (
						<PartBoard title="URLS Out Of Scope">
							{fullResultsTransformed!.outOfScope.map((item, index) => {
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
					)}
				</div>
			)}
		</>
	);
};

export default ZapAjaxFullResultTable;
