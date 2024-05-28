import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../task/Task";

const Column = ({ title, tasks }) => {
  return (
    <div className="min-w-80 min-h-96 bg-gray-200 p-2 rounded-md shadow-xl mt-3">
      <div className="flex justify-center">
        <h2 className="p-2 mt-1 text-xl font-bold">{title}</h2>
      </div>

      <Droppable droppableId={title.toLowerCase().replace(" ", "")}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list "
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
