import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTests,
  getCreatedTest,
  getUpdatedExecutionStatus
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateTest from "./components/CreateTest";
import DataTable from "./components/DataTable";
import ChangeTestExecutionStatus from "./components/ChangeTestExecutionStatus";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const tests = useSelector(state => state.tests);

  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedTests, setSavedTests] = useState(tests);
  const [currentTest, setCurrentTest] = useState({
    id: null,
    name: null,
    description: "",
    executionStatus: ""
  });

  // Setting up Modal
  const setModal = modal => {
    setActiveModal({ name: modal, active: true });
  };

  // Create Test
  const createTest = async test => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedTest(test).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Test created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_TEST", data: result });
          setSavedTests([...tests, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create test."
      });
    } finally {
      setLoading(false);
    }
  };

  // Change Execution Status
  const updateRow = test => {
    setModal("Change Execution Status");

    setCurrentTest({
      id: test.id,
      name: test.name,
      description: test.description,
      executionStatus: test.executionStatus
    });
  };

  const changeTestStatus = async (id, newStatus) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedExecutionStatus({id, newStatus}).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Test execution status updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_TESTS",
            data: tests.map(test =>
                test.id === id ? Object.assign(test, result) : test
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update execution status."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Tests
  const fetchTests = async () => {
    setLoading(true);

    try {
      await getTests().then(({ data }) => {
        setSavedTests(data);
        dispatch({ type: "SET_TESTS", tests: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch tests."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
      <div className="app">
        <Header />
        <main className="content">
          <div className="container">
            {loading ? (
                <Loader />
            ) : (
                <div className="content-wrapper">
                  <div className="toolbar">
                    <button
                        className="primary-btn"
                        onClick={() => setModal("Create Test")}
                    >
                      Create New Test
                    </button>
                  </div>
                  <DataTable
                      tests={tests}
                      updateRow={updateRow}
                  />
                </div>
            )}
          </div>
        </main>
        {activeModal.active && (
            <Modal activeModal={activeModal}>
              {activeModal.name === "Create Test" && (
                  <CreateTest
                      createTest={createTest}
                      setActiveModal={setActiveModal}
                  />
              )}
              {activeModal.name === "Change Execution Status" && (
                  <ChangeTestExecutionStatus
                      currentTest={currentTest}
                      changeTestStatus={changeTestStatus}
                      setActiveModal={setActiveModal}
                  />
              )}
            </Modal>
        )}

        <Footer />
      </div>
  );

}

export default App;