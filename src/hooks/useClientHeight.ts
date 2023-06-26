import { useEffect, useCallback, useState } from "react";

export const useClientHeight = () => {
	const [clientHeight, setClientHeight] = useState<number>(0);

	const handleWindowResize = useCallback(() => {
		const curClientHeight = document.documentElement.clientHeight;
		if (curClientHeight === clientHeight) {
			return;
		}
		setClientHeight(curClientHeight);
	}, [clientHeight]);

	useEffect(() => {
		handleWindowResize();
		window.addEventListener("resize", handleWindowResize);
		return window.removeEventListener("resize", handleWindowResize);
	}, []);

	return clientHeight;
};
