import { useEffect, useState } from "react";
import TransitionsSnackbar from "./Snackbar";
import InputComponent from "./InputComponent";
import Loader from "./Loader";
import { DeleteSvg, EditSvgIcon } from "../SvgIcons";
import NodataFound from "./NodataFound";
import DialogueComponent from "./DialogueComponent";
import Menucomponent from "./MenuComponent";

const statusObjHex = {
  Created: {
    bgColor: "#bde8ff",
    color: "#000",
  },
  Progress: {
    bgColor: "#fce0c5",
    color: "#ff9a38",
  },
  Completed: {
    bgColor: "#c2fccc",
    color: "#38fc59",
  },
};

const ListComponent = () => {
  const [formData, setFormData] = useState({
    taskInput: "",
    inputType: "add",
    isLoading: true,
    tasks: [],
    TaskId: "",
    showDialoge: false,
    openSnacBar: false,
    snackText: "",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setFormData((prevData) => ({
      ...prevData,
      isLoading: false,
      tasks: storedTasks,
    }));
  }, []);

  const handleTaskAdd = () => {
    const { taskInput, inputType, tasks } = formData;
    if (taskInput.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    const updatedTasks =
      inputType === "add"
        ? [
            ...tasks,
            { id: Date.now(), name: taskInput.trim(), status: "Created" },
          ]
        : tasks.map((task) =>
            task.id === formData.TaskId
              ? { ...task, name: taskInput.trim() }
              : task
          );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setFormData({
      ...formData,
      tasks: updatedTasks,
      taskInput: "",
      inputType: "add",
      TaskId: "",
      openSnacBar: true,
      snackText:
        inputType === "add"
          ? "Task added successfully"
          : "Task updated successfully",
    });
  };

  const handleDeleteTask = () => {
    const updatedTasks = formData.tasks.filter(
      (task) => task.id !== formData.TaskId
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setFormData((prevData) => ({
      ...prevData,
      tasks: updatedTasks,
      showDialoge: false,
      snackText: "Task deleted successfully",
    }));
  };

  const handleUpdateTask = (taskId, taskName) => {
    setFormData((prevData) => ({
      ...prevData,
      taskInput: taskName,
      TaskId: taskId,
      inputType: "update",
    }));
  };

  const handleChangeStatus = (taskId, text, taskTitle) => {
    switch (text) {
      case "Edit":
        setFormData((prevData) => ({
          ...prevData,
          taskInput: taskTitle,
          TaskId: taskId,
          inputType: "update",
        }));
        break;
      case "Delete":
        setFormData({ ...formData, showDialoge: true, TaskId: taskId });
        break;
      case "Progress":
      case "Completed":
        const statusUpdated = tasks.map((task) =>
          task.id === taskId ? { ...task, status: text } : task
        );
        localStorage.setItem("tasks", JSON.stringify(statusUpdated));
        setFormData({
          ...formData,
          tasks: statusUpdated,
        });
      default:
        break;
    }
  };

  const renderTaskCard = (task, index) => {
    return (
      <li
        key={index}
        className="shadow-sm rounded p-2 border d-flex justify-content-between align-items-center task-card"
      >
        <span className="fs-5" style={{ wordBreak: "break-all" }}>
          {index + 1}. {task.name}
        </span>
        <div className="d-flex gap-2 align-items-center">
          <span
            className="rounded-pill d-flex align-items-center justify-content-center py-2 px-3"
            style={{
              backgroundColor: statusObjHex[task.status]?.bgColor,
              width: 100,
            }}
          >
            <span
              style={{ color: statusObjHex[task.status]?.color }}
              className="fw-medium fs-6"
            >
              {task.status}
            </span>
          </span>
          <button
            onClick={() => handleUpdateTask(task.id, task.name)}
            className="action-btn d-none d-sm-block"
          >
            <EditSvgIcon />
          </button>
          <button
            onClick={() => {
              setFormData({ ...formData, showDialoge: true, TaskId: task.id });
            }}
            className="action-btn d-none d-sm-block"
          >
            <DeleteSvg />
          </button>
          <Menucomponent
            taskId={task.id}
            task={task.name}
            handerFun={handleChangeStatus}
          />
        </div>
      </li>
    );
  };

  const handleCloseDialog = (status) => {
    setFormData({ ...formData, showDialoge: status });
  };

  const { isLoading, tasks } = formData;

  return (
    <>
      <div className="container-md py-4">
        <div className="p-2 bg-white rounded mb-4 title-container">
          <h1 className="fs-3 title text-center">
            QuadB Tech React Developer Task
          </h1>
        </div>
        <div className="bg-white rounded shadow-md d-flex flex-column gap-2 title-container">
          <div className="border-bottom py-3">
            <InputComponent
              inputValue={formData.taskInput}
              setterFun={(value) =>
                setFormData((prevData) => ({ ...prevData, taskInput: value }))
              }
              handler={handleTaskAdd}
              action={formData.inputType}
            />
          </div>
          <ul
            className="list-unstyled py-2 w-75 d-flex flex-column gap-3 mx-auto"
            id="task-holder"
          >
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center py-3">
                <Loader />
              </div>
            ) : tasks.length > 0 ? (
              tasks.map(renderTaskCard)
            ) : (
              <NodataFound />
            )}
          </ul>
        </div>
      </div>
      {formData.showDialoge && (
        <DialogueComponent
          openDialog={formData.showDialoge}
          setterFun={handleCloseDialog}
          handlerDelete={handleDeleteTask}
        />
      )}
      {formData.openSnacBar && (
        <TransitionsSnackbar
          openSnack={formData.openSnacBar}
          message={formData.snackText}
          setterFun={(e) => setFormData({ ...formData, openSnacBar: e })}
        />
      )}
    </>
  );
};

export default ListComponent;
