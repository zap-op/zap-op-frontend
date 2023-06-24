import { useEffect, useState } from "react";
import { useGetSpiderFullResultQuery } from "../../../store";
import {
	TZapPassiveFullResultGETRequest, //
	TZapSpiderScanFullResults,
} from "../../../utils/types";
import {
	PartBoardURLS,
	TListUrlByMethod, //
	transformListUrl2ListUrlByMethod,
} from "./ZapAjaxResultTable";
import PartBoard from "../../PartBoard";
import Describable from "../../toolkits/Describable";

const ZapSpiderFullResultTable = ({
	_id,
	liftUpDataCallback,
}: TZapPassiveFullResultGETRequest & {
	liftUpDataCallback: (data: TZapSpiderScanFullResults["fullResults"]) => void;
}) => {
	const result = useGetSpiderFullResultQuery({
		_id,
	});

	const { urlsOutOfScope } = { ...result.data?.fullResults };
	const [listUrlInScopeTransformed, setListUrlInScopeTransformed] = useState<TListUrlByMethod[]>();

	useEffect(() => {
		if (!result.data) {
			return;
		}

		liftUpDataCallback(result.data.fullResults);

		setListUrlInScopeTransformed(transformListUrl2ListUrlByMethod(result.data.fullResults.urlsInScope));
	}, [result.data]);

	return (
		<>
			{result.data && (
				<div className="spider table-scroll-wrap table-container">
					{listUrlInScopeTransformed && (
						<PartBoardURLS
							title="URLS In Scope"
							listUrlByMethod={listUrlInScopeTransformed}
						/>
					)}
					{urlsOutOfScope && (
						<PartBoard title="URLS Out Of Scope">
							<div className="detail-block">
								{urlsOutOfScope.map((item, index) => (
									<ul
										key={index}
										className="trow">
										<li className="detail describable">
											<Describable dataTitle={item}>
												<a
													href={item}
													target="_blank"
													rel="noopener noreferrer">
													{item}
												</a>
											</Describable>
										</li>
									</ul>
								))}
							</div>
						</PartBoard>
					)}
				</div>
			)}
		</>
	);
};

export default ZapSpiderFullResultTable;
