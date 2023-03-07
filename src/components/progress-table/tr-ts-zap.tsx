type TTABLEROW_TS_ZAP_Props = {
	number: number;
	url: string;
};

const TABLEROW_TS_ZAP = (props: TTABLEROW_TS_ZAP_Props) => {
	return (
		<ul className="trow">
			<li className="no">{props.number}</li>
			<li className="url">{props.url}</li>
		</ul>
	);
};

export default TABLEROW_TS_ZAP;
