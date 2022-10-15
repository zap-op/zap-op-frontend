import { Component } from "react";

type TNavBarDashboardProps = {

}

type TNavBarDashboardState = {

}

class NavBarDashboard extends Component<TNavBarDashboardProps, TNavBarDashboardState> {
    constructor(props: TNavBarDashboardProps) {
        super(props);
    }
    override render() {
        return (
            <div className="nav-bar-dashboard-container">
                <div className="work-space-container">
                    <span className="icon">
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
                    <h4 className="management-title">
                        MANAGEMENT
                    </h4>
                    <div className="nav-item targets-container">
                        <span className="icon">
                        </span>
                        <h4 className="title">
                            Dashboard
                        </h4>
                    </div>
                    <div className="nav-item targets-container">
                        <span className="icon">
                        </span>
                        <h4 className="title">
                            Targets
                        </h4>
                    </div>
                    <div className="nav-item results-container">
                        <span className="icon">
                        </span>
                        <h4 className="title">
                            Results
                        </h4>
                    </div>
                    <h4 className="management-title">
                        ACTION
                    </h4>
                    <div className="nav-item targets-container">
                        <span className="icon">
                        </span>
                        <h4 className="title">
                            Targets
                        </h4>
                    </div>
                    <div className="nav-item results-container">
                        <span className="icon">
                        </span>
                        <h4 className="title">
                            Results
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBarDashboard;