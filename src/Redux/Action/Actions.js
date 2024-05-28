export const addTask = (item) => ({
  type: "kanban/addTask",
  payload: item,
});

export const removeTask = (id) => ({
  type: "kanban/removeTask",
  payload: { id },
});


export const editTask = (item) => ({
  type: "kanban/editTask",
  payload: item,
});
