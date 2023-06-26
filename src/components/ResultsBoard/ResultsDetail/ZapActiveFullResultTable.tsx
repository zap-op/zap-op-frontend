import { TZapActiveScanFullResults } from "../../../utils/types";
import AlertsDetailBoards from "./AlertsDetailBoards";

const ZapActiveFullResultTable = ({
	alerts, //
	alertsByRisk,
}: TZapActiveScanFullResults["fullResults"]) => {
	return (
		<AlertsDetailBoards
			alerts={alerts}
			alertsByRisk={alertsByRisk}
			extendClassName="active table-scroll-wrap"
		/>
	);
};

export default ZapActiveFullResultTable;
