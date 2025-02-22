import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loader from "../Pages/Loader/Loader";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";

const TaskBoard = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  // Fetch tasks using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tasks?userId=${user?.uid}`);
      return response.data;
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }

    if (user) {
      const socket = io("http://localhost:5000");

      socket.on("taskUpdated", (updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      });

      socket.on("taskCreated", (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      });

      socket.on("taskDeleted", (taskId) => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, data]);

  const handleDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const movedTask = tasks[source.index];
    movedTask.category = destination.droppableId;

    const updatedTasks = [...tasks];
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    // Update task in database
    await axiosPublic.put(`/tasks/${movedTask._id}`, movedTask);
  };

  const handleEdit = (task) => {
    setIsEditing(task._id);
    setEditedTask({ ...task });
  };

  const handleSaveEdit = async () => {
    try {
      await axiosPublic.put(`/tasks/${editedTask._id}`, editedTask);
      setIsEditing(null);
      Swal.fire("Updated!", "Task has been updated.", "success");
    } catch (error) {
      Swal.fire("Error", "Could not update the task.", "error");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  const deleteTask = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/tasks/${taskId}`);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-board grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <Droppable droppableId={category} key={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="task-category p-6 bg-white rounded-lg shadow-md flex flex-col h-full"
              >
                <h2 className="text-xl font-semibold mb-4">{category}</h2>
                <div className="task-list flex flex-col space-y-4">
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task._id}
                        index={index}
                        key={task._id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task p-4 bg-gray-100 rounded-lg shadow-sm"
                          >
                            {isEditing === task._id ? (
                              <div>
                                <input
                                  type="text"
                                  value={editedTask.title}
                                  onChange={(e) =>
                                    setEditedTask({
                                      ...editedTask,
                                      title: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 mb-2 border rounded"
                                />
                                <textarea
                                  value={editedTask.description}
                                  onChange={(e) =>
                                    setEditedTask({
                                      ...editedTask,
                                      description: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 mb-2 border rounded"
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  className="bg-green-500 text-white p-2 rounded"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="bg-gray-500 text-white p-2 rounded ml-2"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div>
                                <h3 className="font-medium">{task.title}</h3>
                                <p>{task.description}</p>
                                <div className="flex justify-between">
                                  <button
                                    onClick={() => handleEdit(task)}
                                    className="text-blue-500 text-sm hover:text-blue-700 mt-2"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task._id)}
                                    className="text-red-500 text-sm hover:text-red-700 mt-2"
                                  >
                                    Delete Task
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
