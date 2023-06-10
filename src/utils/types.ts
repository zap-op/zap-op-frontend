export type TGoogleCredentialResponse = {
	credential: string;
	select_by: string;
};

export type ExtractArrayItemType<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] //
	? ElementType
	: never;
	
export * from "../submodules/utility/types";
