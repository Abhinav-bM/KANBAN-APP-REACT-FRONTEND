import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  updateTaskStatus,
  fetchTasks,
} from "../../Redux/Reducer/Reducer";
import { useNavigate } from "react-router-dom";
import Column from "../column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import "./Board.css";

const Board = () => {
  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.kanban.tasks);
  const [newTask, setNewTask] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromLocal = localStorage.getItem("token");
    tokenFromLocal ? setToken({ tokenFromLocal }) : navigate("/login");
    dispatch(fetchTasks());
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Math.random().toString(),
        content: newTask,
        status: "todo",
      };

      dispatch(addTask(task));
      setNewTask("");
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        updateTaskStatus({
          id: result.draggableId,
          status: destination.droppableId,
        })
      );
    }
  };

  if (token) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col p-10">
          <div
            className="flex justify-between items-center min-h-20 rounded-md px-5 shadow-xl"
            style={{ backgroundColor: "rgb(209 213 219)" }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-4xl text-center font-bold text-slate-500">Kanban Board</h1>
            <button
              className=" bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded-md my-1 mx-1 max-h-10"
              onClick={logout}
            >
              <p className="text-sm sm:text-xm lg:text-md">Logout</p>  
            </button>
          </div>

          <div className="task-input flex justify-center p-10">
            <input
              type="text"
              className="w-60 h-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500 my-1"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <button
              type="button"
              className=" bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded-md my-1 mx-1"
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap justify-around ">
            <Column
              title="To Do"
              tasks={tasks.filter((task) => task.status === "todo")}
            />
            <Column
              title="In Progress"
              tasks={tasks.filter((task) => task.status === "inprogress")}
            />
            <Column
              title="Completed"
              tasks={tasks.filter((task) => task.status === "completed")}
            />
          </div>
        </div>
      </DragDropContext>
    );
  } else {
    navigate("/login");
  }
};

export default Board;
