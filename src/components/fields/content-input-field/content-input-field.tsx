import { Component, HTMLInputTypeAttribute, ReactNode } from "react";

type TContentInputFieldProps = {
    title?: string;
    placeHolder?: string;
    type: HTMLInputTypeAttribute;
    isRequired?: boolean;
}

class ContentInputField extends Component<TContentInputFieldProps> {
    constructor(props: TContentInputFieldProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="content-input-field-container">
                {this.props.title
                    ?
                    <div className="title-container">
                        <h4 className={this.props.isRequired ? "is-required" : ""}>
                            {this.props.title}
                        </h4>
                    </div>
                    :
                    <></>
                }
                <div className="input-field-container">
                    <input type={this.props.type} placeholder={this.props.placeHolder} />
                </div>
            </div >
        )
    }
}

export default ContentInputField;