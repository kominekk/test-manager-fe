import React, { useState, useEffect } from "react";

const ChangeTestExecutionStatus = props => {
    const [test, setStatus] = useState(props.currentTest);
    // const executionStatuses =["FAILED", "UNDEFINED", "PASSED"]

    const onInputChange = event => {
        const { name, value } = event.target;

        setStatus({ ...test, [name]: value });
    };

    const cancel = event => {
        event.preventDefault();
        props.setActiveModal({ active: false });
    };

    useEffect(() => {
        setStatus(props.currentTest);
    }, [props]);

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                props.changeTestStatus(test.id, test.executionStatus);
            }}
        >
            <div className="form-group">
                <label className="bold">Test Name</label>
                <label>{test.name}</label>
            </div>
            <div className="form-group">
                <label className="bold">Test Description</label>
                <label>{test.description}</label>
            </div>
            <div className="form-group">
                <label className="bold">Execution Status</label>
                <input
                    type="text"
                    name="execution_status"
                    value={test.executionStatus}
                    onChange={onInputChange}
                />
            </div>
            <div className="form-group form-group--actions">
                <button className="primary-btn">Change status</button>
                <button className="cancel-btn" onClick={cancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};



export default ChangeTestExecutionStatus;