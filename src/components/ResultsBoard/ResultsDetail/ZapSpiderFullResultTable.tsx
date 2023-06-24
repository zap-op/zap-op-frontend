import { TZapPassiveFullResultGETRequest, TZapSpiderScanFullResults } from "../../../utils/types";

const ZapSpiderFullResultTable = ({}: TZapPassiveFullResultGETRequest & {
	liftUpDataCallback: (data: TZapSpiderScanFullResults["fullResults"]) => void;
}) => {
	return <></>;
};

export default ZapSpiderFullResultTable;
