import { toast } from "react-hot-toast";
import { useMemo } from "react";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import { TStatusResponse, TTargetModel } from "../../../utils/types";
import { useMoveToTrashTargetMutation } from "../../../store";

type TTargetsTable = {
	listTarget: TItemRow[];
};

const TargetsTable = ({ listTarget }: TTargetsTable) => {
	return (
		<div className="targets-table-container table-container">
			<div className="table-scroll-wrap">
				<div className="table-head-container">
					<ul className="thead">
						<li className="name">Name</li>
						<li className="target">Target</li>
						<li className="tag">Tag</li>
						<li className="first-seen">Create at</li>
						<li className="last-seen">Update at</li>
						<li className="action">Actions</li>
					</ul>
				</div>
				<div className="table-body-container">
					{listTarget?.map((item) => (
						<ItemRow {...item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TargetsTable;

type TItemRow = TTargetModel;

const ItemRow = ({
	_id: targetId, //
	name,
	target,
	tag,
	createdAt,
	updatedAt,
}: TItemRow) => {
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
			<li className="target">
				<a
					href={target}
					target="_blank"
					rel="noopener noreferrer">
					{target}
				</a>
			</li>
			<li className="tag">{tag}</li>
			<li className="first-seen">{displayCreateAt}</li>
			<li className="last-seen">{displayUpdateAt}</li>
			<li className="action">
				<MoreOptionsButton listOptions={[newScanOption, deleteOption]} />
			</li>
		</ul>
	);
};
