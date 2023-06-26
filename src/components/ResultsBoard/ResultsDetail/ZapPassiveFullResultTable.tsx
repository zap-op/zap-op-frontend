import { TZapPassiveScanFullResults } from "../../../utils/types";
import AlertsDetailBoards from "./AlertsDetailBoards";

const ZapPassiveFullResultTable = ({
	alerts, //
	alertsByRisk,
}: TZapPassiveScanFullResults["fullResults"]) => {
	return (
		<AlertsDetailBoards
			alerts={alerts}
			alertsByRisk={alertsByRisk}
			extendClassName="passive table-scroll-wrap"
		/>
	);
};

export default ZapPassiveFullResultTable;
