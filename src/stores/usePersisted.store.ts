import { useEffect, useState } from "react";
import { useGlobal } from "./useGlobal.store";

export const useStore = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	callback: (state: T) => F,
) => {
	const result = store(callback) as F;
	const [data, setData] = useState<F>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
};

export const usePersistedGlobal = <T, F>(callback: (state: T) => F) =>
	useStore(useGlobal, callback);
