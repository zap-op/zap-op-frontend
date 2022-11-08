import { Component, createRef, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import workSpaceImage from "../../assets/work-space.svg";

type TPanelDashboardProps = {

}

type TPanelDashboardState = {
}

class PanelDashboard extends Component<TPanelDashboardProps, TPanelDashboardState> {
    private ref_panel: React.RefObject<HTMLDivElement>;
    private readonly LOCAL_STORAGE_KEY_PANEL_WIDTH = `UI.${PanelDashboard.name}.style.width`;
    private readonly PANEL_WIDTH_DEFAULT = 300;

    constructor(props: TPanelDashboardProps) {
        super(props);
        this.handleResizePanelOnMouseDown = this.handleResizePanelOnMouseDown.bind(this);
        this.handleResizePanelOnMouseMove = this.handleResizePanelOnMouseMove.bind(this);
        this.handleResizePanelOnMouseUp = this.handleResizePanelOnMouseUp.bind(this);
        this.ref_panel = createRef<HTMLDivElement>();
    }

    override componentDidMount(): void {
        const panelWidth = localStorage.getItem(this.LOCAL_STORAGE_KEY_PANEL_WIDTH);
        if (!panelWidth) {
            this.resizePanel(`${this.PANEL_WIDTH_DEFAULT}px`);
        } else {
            this.resizePanel(`${panelWidth}px`);
        }
    }

    private resizePanel(width: string): void {
        this.ref_panel.current!.style.width = width;
    }

    private getCurentPanelWidth(): number {
        return this.ref_panel.current!.clientWidth;
    }

    private handleResizePanelOnMouseMove(event: MouseEvent) {
        this.resizePanel(`${this.getCurentPanelWidth() + event.movementX}px`);
        localStorage.setItem(this.LOCAL_STORAGE_KEY_PANEL_WIDTH, `${this.getCurentPanelWidth()}`);
    }

    private handleResizePanelOnMouseUp() {
        document.removeEventListener("mousemove", this.handleResizePanelOnMouseMove);
        document.removeEventListener("mouseup", this.handleResizePanelOnMouseUp);
    }

    private handleResizePanelOnMouseDown() {
        document.addEventListener("mousemove", this.handleResizePanelOnMouseMove);
        document.addEventListener("mouseup", this.handleResizePanelOnMouseUp);
    }

    override render(): ReactNode {
        return (
            <div className="panel-dashboard-container">
                <div className="panel-container" ref={this.ref_panel}>
                    <div className="work-space-info-container">
                        <span className="icon-container">
                            <img src={workSpaceImage} alt="work-space.svg" />
                        </span>
                        <div className="title-container">
                            <h4 className="title">
                                Example
                            </h4>
                            <span className="sub-title">
                                Sub example
                            </span>
                        </div>
                    </div>
                    <div className="work-space-nav-container">
                        <h4 className="nav-title management-title">
                            MANAGEMENT
                        </h4>
                        <NavLink to="dashboard" className="nav-item dashboard-container" draggable="false">
                            <span className="icon">
                            </span>
                            <h4 className="title">
                                Dashboard
                            </h4>
                        </NavLink>
                        <NavLink to="targets" className="nav-item targets-container" draggable="false">
                            <span className="icon">
                            </span>
                            <h4 className="title">
                                Targets
                            </h4>
                        </NavLink>
                        <NavLink to="results" className="nav-item results-container" draggable="false">
                            <span className="icon">
                            </span>
                            <h4 className="title">
                                Results
                            </h4>
                        </NavLink>
                        <h4 className="nav-title aciton-title">
                            ACTION
                        </h4>
                        <NavLink to="addscan" className="nav-item new-scan-container" draggable="false">
                            <span className="icon">
                            </span>
                            <h4 className="title">
                                New scan
                            </h4>
                        </NavLink>
                    </div>
                    <div className="br">
                    </div>
                    <div className="work-space-nav-container">
                        <NavLink to="wspsettings" className="nav-item settings-container" draggable="false">
                            <span className="icon">
                            </span>
                            <h4 className="title">
                                Workspace settings
                            </h4>
                        </NavLink>
                    </div>
                </div>
                <div className="panel-resize-controller">
                    <button className="resize-bar-button" onMouseDown={this.handleResizePanelOnMouseDown}>
                        <span className="resize-bar">
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

export default PanelDashboard;