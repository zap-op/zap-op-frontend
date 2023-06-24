import { useEffect } from "react";
import { useGetPassiveFullResultQuery } from "../../../store";
import { TZapPassiveFullResultGETRequest, TZapPassiveScanFullResults } from "../../../utils/types";
import AlertsDetailBoards from "./AlertsDetailBoards";

const ZapPassiveFullResultTable = ({
	_id, //
	liftUpDataCallback,
}: TZapPassiveFullResultGETRequest & {
	liftUpDataCallback: (data: TZapPassiveScanFullResults["fullResults"]) => void;
}) => {
	const result = useGetPassiveFullResultQuery({
		_id,
	});
	const {
		alerts, //
		alertsByRisk,
	} = { ...result.data?.fullResults };

	useEffect(() => {
		if (result.data) {
			liftUpDataCallback(result.data.fullResults);
		}
	}, [result.data]);
	return (
		<>
			{alerts && alertsByRisk && (
				<AlertsDetailBoards
					alerts={alerts}
					alertsByRisk={alertsByRisk}
					extendClassName="passive table-scroll-wrap"
				/>
			)}
		</>
	);
};

export default ZapPassiveFullResultTable;
