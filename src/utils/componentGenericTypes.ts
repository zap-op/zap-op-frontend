import { Dispatch } from "react";

export type THandleChangeValue = {
	handleChangeValue: Dispatch<React.SetStateAction<any | undefined>>;
};

export type TInput = {
	id: string;
};
