import { useEffect } from "react";
import { useGetActiveFullResultQuery } from "../../../store";
import { TZapActiveFullResultGETRequest, TZapActiveScanFullResults } from "../../../utils/types";
import AlertsDetailBoards from "./AlertsDetailBoards";

const ZapActiveFullResultTable = ({
	_id, //
	liftUpDataCallback,
}: TZapActiveFullResultGETRequest & {
	liftUpDataCallback: (data: TZapActiveScanFullResults["fullResults"]) => void;
}) => {

	const result = useGetActiveFullResultQuery({
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
					extendClassName="active table-scroll-wrap"
				/>
			)}
		</>
	);
};

export default ZapActiveFullResultTable;
