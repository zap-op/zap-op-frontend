import { Dispatch, HTMLInputTypeAttribute } from "react";

type TTextFieldProps = {
    title?: string;
    errorMessage?: string;
    isDisplayErrorMessage?: boolean;
    placeHolder?: string;
    type: HTMLInputTypeAttribute;
    isRequired?: boolean;
    handleChangeValue: Dispatch<React.SetStateAction<any | undefined>>;
}

const TextField = (props: TTextFieldProps) => {
    return (
        <div className="text-field-container">
            {props.title
                ?
                <div className="title-container">
                    <h4 className={props.isRequired ? "is-required" : ""}>
                        {props.title}
                    </h4>
                </div>
                :
                <></>
            }
            {(props.errorMessage && props.isDisplayErrorMessage)
                ?
                <div className="message error-message secondary-error-message">
                    {props.errorMessage}
                </div>
                :
                <></>
            }
            <div className="input-field-container">
                <input type={props.type} placeholder={props.placeHolder} onChange={(event) => props.handleChangeValue(event.target.value)} />
            </div>
        </div >
    );
}

export default TextField;