import React, { useState } from "react";

const CreateTest = props => {
    const initialData = { id: null, name: "", description: ""};
    const [test, setTest] = useState(initialData);

    const onInputChange = event => {
        const { name, value } = event.target;

        setTest({ ...test, [name]: value });
    };

    const cancel = event => {
        event.preventDefault();
        props.setActiveModal({ active: false });
    };

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                if (!test.name || !test.description) return;
                props.createTest(test);
            }}
        >
            <div className="form-group">
                <label>Test Name</label>
                <input
                    type="text"
                    name="name"
                    value={test.name}
                    onChange={onInputChange}
                />
            </div>
            <div className="form-group">
                <label>Test description</label>
                <input
                    type="text"
                    name="description"
                    value={test.description}
                    onChange={onInputChange}
                />
            </div>
            <div className="form-group form-group--actions">
                <button className="primary-btn">Create</button>
                <button className="cancel-btn" onClick={cancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CreateTest;
