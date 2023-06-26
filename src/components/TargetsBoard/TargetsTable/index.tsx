import { toast } from "react-hot-toast";
import { useEffect, useMemo, useRef, useState } from "react";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import { TStatusResponse, TTargetModel } from "../../../utils/types";
import { addSelectTarget, useDispatch, useMoveToTrashTargetMutation } from "../../../store";
import moment from "moment";
import Describable from "../../toolkits/Describable";
import { useNavigate } from "react-router-dom";
import { AddScanBoardLinkState } from "../../AddScanBoard";

type TTargetsTable = {
	listTarget: TItemRow[];
	heightScrollWrap: string;
};

const TARGET_TABLE_ID = "target-table";

const TargetsTable = ({
	listTarget, //
	heightScrollWrap,
}: TTargetsTable) => {
	const ref_thead = useRef<HTMLUListElement>(null);
	const [theadComputedHeight, setTheadComputedHeight] = useState<number>(0);

	useEffect(() => {
		const thead = ref_thead.current;
		if (!thead) {
			return;
		}
		const theadComputedStyle = getComputedStyle(thead);
		setTheadComputedHeight(thead.offsetHeight + parseInt(theadComputedStyle.marginBottom));
	}, []);

	return (
		<div
			id={TARGET_TABLE_ID}
			className="targets-table-container table-container">
			<ul
				ref={ref_thead}
				className="thead">
				<li className="name">Name</li>
				<li className="target">Target</li>
				<li className="tag">Tag</li>
				<li className="first-seen">Create at</li>
				<li className="last-seen">Update at</li>
				<li className="action">Actions</li>
			</ul>
			<div
				className="table-body-container table-scroll-wrap"
				style={{
					maxHeight: heightScrollWrap,
				}}>
				{listTarget?.map((item) => (
					<ItemRow
						{...item}
						relativeHeight={theadComputedHeight}
						key={item._id.toString()}
					/>
				))}
			</div>
		</div>
	);
};

export default TargetsTable;

type TItemRow = TTargetModel & {
	relativeHeight?: number;
};

const ItemRow = ({
	_id: targetId, //
	name,
	target,
	tag,
	createdAt,
	updatedAt,
	relativeHeight,
}: TItemRow) => {
	const targetIdStr = targetId.toString();
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const newScanOption: TOptionItem = {
		name: "New scan",
		handle: () => {
			console.log("herhe");
			dispatch(
				addSelectTarget({
					_id: targetId,
					name,
				}),
			);
			navigate("/app/addscan", {
				state: AddScanBoardLinkState.ScanOptions,
			});
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
				<Describable dataTitle={target}>
					<a
						href={target}
						target="_blank"
						rel="noopener noreferrer">
						{target}
					</a>
				</Describable>
			</li>
			<li className="tag">
				{tag?.map((item) => (
					<span
						key={item}
						className="tag-item">
						{item}
					</span>
				))}
			</li>
			<li className="first-seen">{displayCreateAt}</li>
			<li className="last-seen">{displayUpdateAt}</li>
			<li className="action">
				<MoreOptionsButton
					id={targetIdStr}
					listOptions={[newScanOption, deleteOption]}
					style={{
						relativeHeight,
						parentIdContainPortal: TARGET_TABLE_ID,
					}}
				/>
			</li>
		</ul>
	);
};
