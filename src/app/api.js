import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getTests() {
    const response = axios.get(`${apiURL}/tests`)
    return response;
}

function getCreatedTest({name, description}) {
    const response = axios.post(`${apiURL}/tests`, {
        name,
        description
    });

    return response;
}

function getUpdatedExecutionStatus({id, executionStatus}) {
    const response = axios.put(`${apiURL}/tests`, {
        id: id,
        newStatus: executionStatus
    });

    return response;
}


export {getTests, getCreatedTest, getUpdatedExecutionStatus};