import { useEffect, useState } from "react";
import { TZapSpiderScanFullResults } from "../../../utils/types";
import {
	PartBoardURLS,
	TListUrlByMethod, //
	transformListUrl2ListUrlByMethod,
} from "./ZapAjaxFullResultTable";
import PartBoard from "../../PartBoard";
import Describable from "../../toolkits/Describable";

const ZapSpiderFullResultTable = ({
	urlsInScope, //
	urlsOutOfScope,
}: TZapSpiderScanFullResults["fullResults"]) => {
	const [listUrlInScopeTransformed, setListUrlInScopeTransformed] = useState<TListUrlByMethod[]>([]);

	useEffect(() => {
		setListUrlInScopeTransformed(transformListUrl2ListUrlByMethod(urlsInScope));
	}, []);

	return (
		<div className="spider table-scroll-wrap table-container">
			{listUrlInScopeTransformed.length != 0 && (
				<PartBoardURLS
					title="URLS In Scope"
					listUrlByMethod={listUrlInScopeTransformed}
				/>
			)}
			{urlsOutOfScope.length != 0&& (
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
	);
};

export default ZapSpiderFullResultTable;
