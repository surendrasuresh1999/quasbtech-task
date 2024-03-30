import { useEffect, useState } from "react";
import { DeleteSvg, EditSvgIcon, PlusSvg } from "./SvgIcons";
import TransitionsSnackbar from "./Components/Snackbar";
import Loader from "./Components/Loader";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
      setIsLoading(false);
    }
  }, []);

  const handleTaskAdd = () => {
    // Add the new task to the tasks array
    const newTask = { id: Date.now(), name: taskInput };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Clear the input field
    setTaskInput("");
  };

  const handleDeleteTask = (taskId) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
      const filteredTasks = storedTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));

      setTasks(filteredTasks);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <TransitionsSnackbar />
      <div className="container-md py-3">
        <div className="p-2 bg-white rounded shadow-sm mb-3">
          <h1 className="fs-3 title text-center">
            QuadB Tech React Developer Task
          </h1>
        </div>
        {/* main container */}
        <div className="bg-white rounded shadow-sm d-flex flex-column gap-2">
          <div
            className="d-flex align-items-center gap-4 w-75 pt-3 mx-auto"
            id="task-holder"
          >
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              type="text"
              className="p-3 flex-grow-1 form-control"
            />
            <button
              onClick={handleTaskAdd}
              className="p-3 btn btn-primary fw-semibold flex-shrink-0 d-flex align-items-center gap-2"
            >
              <PlusSvg />
              ADD TASK
            </button>
          </div>
          {/* list of tasks */}
          <div>
            <ul
              className="list-unstyled py-2 w-75 d-flex flex-column gap-3 mx-auto"
              id="task-holder"
            >
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center py-3">
                  <Loader />
                </div>
              ) : (
                tasks.map((task, i) => (
                  <li
                    key={i}
                    className="shadow-sm rounded p-3 border d-flex justify-content-between task-card"
                  >
                    <span>
                      {i + 1}. {task.name}
                    </span>
                    <div className="d-flex">
                      <button className="action-btn">
                        <EditSvgIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="action-btn"
                      >
                        <DeleteSvg />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
