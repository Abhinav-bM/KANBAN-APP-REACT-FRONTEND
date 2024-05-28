import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../Reducer/Reducer";

const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});

export default store;