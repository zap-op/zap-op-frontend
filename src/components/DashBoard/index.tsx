import { useEffect, useState } from "react";
import { scanSessionApi, useGetTargetQuery } from "../../store";
import { ResultsTable } from "../ResultsBoard";
import TargetsTable from "../TargetsBoard/TargetsTable";

const TABLE_HEIGHT_SCROLL_WRAP = "32vh";

const DashBoard = () => {
	const { data: listTarget } = useGetTargetQuery(undefined, {
		refetchOnFocus: true,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
	});
	const { data: listScanSession } = scanSessionApi.endpoints.getScanSession.useQueryState();

	const [isResultTableInFirstOrder, setIsResultTableInFirstOrder] = useState<boolean>(false);

	useEffect(() => {
		if (!listScanSession && !listTarget) {
			return;
		}
		if (!listScanSession) {
			setIsResultTableInFirstOrder(false);
			return;
		}
		if (!listTarget) {
			setIsResultTableInFirstOrder(true);
			return;
		}

		if (listScanSession.length !== 0 && listTarget.length !== 0) {
			const lastSessionUpdatedDate = new Date(listScanSession[0].updatedAt);
			const lastTargetUpdatedDate = new Date(listTarget[0].updatedAt);
			if (lastSessionUpdatedDate >= lastTargetUpdatedDate) {
				setIsResultTableInFirstOrder(true);
				return;
			}
			setIsResultTableInFirstOrder(false);
		}
	}, [listScanSession, listTarget]);

	return (
		<div className="dashboard-container">
			{isResultTableInFirstOrder ? (
				<>
					<h3>Results</h3>
					<ResultsTable heightScrollWrap={TABLE_HEIGHT_SCROLL_WRAP} />
					<hr />
					<h3>Targets</h3>
					<TargetsTable
						listTarget={listTarget ? listTarget : []}
						heightScrollWrap={TABLE_HEIGHT_SCROLL_WRAP}
					/>
				</>
			) : (
				<>
					<h3>Targets</h3>
					<TargetsTable
						listTarget={listTarget ? listTarget : []}
						heightScrollWrap={TABLE_HEIGHT_SCROLL_WRAP}
					/>
					<hr />
					<h3>Results</h3>
					<ResultsTable heightScrollWrap={TABLE_HEIGHT_SCROLL_WRAP} />
				</>
			)}
		</div>
	);
};

export default DashBoard;