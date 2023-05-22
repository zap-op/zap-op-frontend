import { toast } from "react-hot-toast";
import { useMoveToTrashTargetMutation } from "../../../store";

import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import { TStatusResponse, TTargetModel } from "../../../utils/types";
import { useMemo } from "react";

export type TTABLEROW_Targets_Props = TTargetModel;

const TABLEROW_Targets = ({
	_id: targetId, //
	name,
	target,
	tag,
	createdAt,
	updatedAt,
}: TTABLEROW_Targets_Props) => {
	const displayCreateAt = useMemo(() => new Date(createdAt).toLocaleDateString(), [createdAt]);
	const displayUpdateAt = useMemo(() => new Date(updatedAt).toLocaleDateString(), [updatedAt]);

	const newScanOption: TOptionItem = {
		name: "New scan",
		handle: () => {
			toast.error("Under development");
		},
	};

	const [moveToTrashTarget] = useMoveToTrashTargetMutation();
	const deleteOption: TOptionItem = {
		name: "Move to trash",
		handle: () => {
			const toastId = toast.loading(`Moving ${name} target to trash`);
			if (!targetId) {
				toast.error("Something went wrong");
				return;
			}
			moveToTrashTarget(targetId)
				.unwrap()
				.then((result) => {
					if (result.statusCode > 0) {
						toast.success(`${name} ${result.msg}`, {
							id: toastId,
						});
					} else {
						toast.error(result.msg, {
							id: toastId,
						});
					}
				})
				.catch((error) => {
					if (!error.data) {
						toast.error("Something went wrong", {
							id: toastId,
						});
						return;
					}
					toast.error((error.data as TStatusResponse).msg, {
						id: toastId,
					});
				});
		},
	};

	return (
		<ul className="trow">
			<li className="name">{name}</li>
			<li className="target">{target}</li>
			<li className="tag">{tag}</li>
			<li className="first-seen">{displayCreateAt}</li>
			<li className="last-seen">{displayUpdateAt}</li>
			<li className="action">
				<MoreOptionsButton listOptions={[newScanOption, deleteOption]} />
			</li>
		</ul>
	);
};

export default TABLEROW_Targets;
