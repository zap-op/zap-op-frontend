import { useEffect, useCallback, DependencyList } from "react";

export function useDebounceEffect(effect: any, dependence: DependencyList, delay = 250) {
	const callback = useCallback(effect, dependence);

	useEffect(() => {
		const timeout = setTimeout(callback, delay);
		return () => clearTimeout(timeout);
	}, [callback, delay]);
}
