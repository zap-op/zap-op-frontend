import { Toaster } from "react-hot-toast";
import { TOAST_MAX_LOADING_DURATION } from "../../utils/settings";

const ToasterMgr = () => {
	return (
		<Toaster
			toastOptions={{
				loading: {
					duration: TOAST_MAX_LOADING_DURATION,
				},
			}}
		/>
	);
};

export default ToasterMgr;
