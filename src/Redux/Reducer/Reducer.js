import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

const initialState = {
  tasks: [],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const token = localStorage.getItem("token");
      axios.post("/add/task", { task: action.payload, token: token });
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const token = localStorage.getItem("token");
      axios.put("/task/editStatus", { taskId: id, taskStatus: status, token });
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    editTask: (state, action) => {
      const token = localStorage.getItem("token");
      const { id, content } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.content = content;
      }
      axios.put("/task/edit", { content, id, token });
    },

    removeTask: (state, action) => {
      const token = localStorage.getItem("token");
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      axios.post(`/delete/task`,{ id :action.payload, token });
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const fetchTasks = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`/get/tasks`, { token: token });
    console.log("tasks from backend : ", response);
    dispatch(setTasks(response.data.data));
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
};

export const { addTask, updateTaskStatus, setTasks, editTask, removeTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;

