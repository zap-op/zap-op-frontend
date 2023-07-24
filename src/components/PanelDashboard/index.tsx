import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logoLight from "../../assets/logo/owlens-logo_light.svg";

const PanelDashboard = () => {
	const ref_panel = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const panelWidth = localStorage.getItem(PanelDashboard.LOCAL_STORAGE_KEY_PANEL_WIDTH);
		if (!panelWidth) {
			resizePanel(`${PanelDashboard.PANEL_WIDTH_DEFAULT}px`);
		} else {
			resizePanel(`${panelWidth}px`);
		}
	}, []);

	const resizePanel = (width: string): void => {
		ref_panel.current!.style.width = width;
	};

	const getCurentPanelWidth = (): number => {
		return ref_panel.current!.clientWidth;
	};

	const handleResizePanelOnMouseMove = (event: MouseEvent) => {
		resizePanel(`${getCurentPanelWidth() + event.movementX}px`);
		localStorage.setItem(PanelDashboard.LOCAL_STORAGE_KEY_PANEL_WIDTH, `${getCurentPanelWidth()}`);
	};

	const handleResizePanelOnMouseUp = () => {
		document.removeEventListener("mousemove", handleResizePanelOnMouseMove);
		document.removeEventListener("mouseup", handleResizePanelOnMouseUp);
	};

	const handleResizePanelOnMouseDown = () => {
		document.addEventListener("mousemove", handleResizePanelOnMouseMove);
		document.addEventListener("mouseup", handleResizePanelOnMouseUp);
	};

	return (
		<div className="panel-dashboard-container">
			<div
				className="panel-container"
				ref={ref_panel}>
				<div className="logo-container">
					<Link to="/app">
						<img
							src={logoLight}
							alt="owlens-logo_light.svg"
						/>
					</Link>
				</div>
				<div className="work-space-nav-container">
					<h4 className="nav-title management-title">MANAGEMENT</h4>
					<NavLink
						to=""
						className="nav-item dashboard-container"
						draggable={false}
						end>
						<span className="icon"></span>
						<h4 className="title">Dashboard</h4>
					</NavLink>
					<NavLink
						to="targets"
						className="nav-item targets-container"
						draggable={false}
						end>
						<span className="icon"></span>
						<h4 className="title">Targets</h4>
					</NavLink>
					<NavLink
						to="results"
						className="nav-item results-container"
						draggable={false}>
						<span className="icon"></span>
						<h4 className="title">Results</h4>
					</NavLink>
					<h4 className="nav-title aciton-title">ACTION</h4>
					<NavLink
						to="addscan"
						className="nav-item new-scan-container"
						draggable={false}
						end>
						<span className="icon"></span>
						<h4 className="title">New scan</h4>
					</NavLink>
				</div>
				<div className="br"></div>
				<div className="work-space-nav-container">
					<NavLink
						to="settings"
						className="nav-item settings-container"
						draggable={false}
						end>
						<span className="icon"></span>
						<h4 className="title">Settings</h4>
					</NavLink>
				</div>
			</div>
			<div className="panel-resize-controller">
				<button
					className="resize-bar-button"
					onMouseDown={handleResizePanelOnMouseDown}>
					<span className="resize-bar"></span>
				</button>
			</div>
		</div>
	);
};

PanelDashboard.LOCAL_STORAGE_KEY_PANEL_WIDTH = `UI.${PanelDashboard.name}.style.width`;
PanelDashboard.PANEL_WIDTH_DEFAULT = 300;

export default PanelDashboard;
