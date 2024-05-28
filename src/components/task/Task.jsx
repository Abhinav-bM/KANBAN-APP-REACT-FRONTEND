import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { editTask, removeTask } from "../../Redux/Reducer/Reducer";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const handleEdit = () => {
    if (isEditing && newContent !== task.content) {
      dispatch(editTask({ id: task.id, content: newContent }));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };
  return (
    <div className="bg-slate-300 rounded-md shadow-md mt-2 mx-2">
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task py-2 px-4 bg-slate-300 rounded-md shadow-md mt-2 flex justify-between items-center"
          >
            {isEditing ? (
              <input
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full mr-2"
              />
            ) : (
              <span>{task.content}</span>
            )}
            <div>
              <button onClick={handleEdit} className="mx-1 text-blue-500">
                {isEditing ? (
                  "Save"
                ) : (
                  <i className="fa-solid fa-pen-to-square"></i>
                )}
              </button>
              <button onClick={handleDelete} className="mx-1 text-red-500">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Task;
