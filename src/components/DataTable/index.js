import React from "react";
// Styles
import "./style.scss";

const DataTable = props => {
    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                <tr>
                    <th></th>
                    <th>
                      <span className="column">
                        Test Name
                      </span>
                    </th>
                    <th>
                      <span className="column">
                        Test description
                      </span>
                    </th>
                    <th>
                      <span className="column">
                        Execution status
                      </span>
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.tests.length ? (
                    props.tests.map(test => (
                        <tr key={test.id}>
                            <td>{test.id}</td>
                            <td>{test.name}</td>
                            <td>{test.description}</td>
                            <td>{test.executionStatus}</td>
                            <td className="field-actions">
                                <button
                                    className="primary-btn"
                                    onClick={() => {
                                        props.updateRow(test);
                                    }}
                                >
                                    Change Status
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">
                            <div className="no-record-message">No Record!</div>
                        </td>
                    </tr>
                 )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;