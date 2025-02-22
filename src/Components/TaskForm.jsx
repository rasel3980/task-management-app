import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loader from "../Pages/Loader/Loader";
import Swal from "sweetalert2";

const TaskForm = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To-Do');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if dueDate is in the past
    const today = new Date().toISOString().split("T")[0];
    if (dueDate && dueDate < today) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Due date cannot be in the past.",
      });
      return;
    }

    const taskData = {
      userId: user?.uid, 
      title,
      description,
      category,
      dueDate,
    };

    setIsSubmitting(true); 
    try {
      const response = await axiosPublic.post('/tasks', taskData);
    //   console.log('Task created:', response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear form after successful submission
      setTitle('');
      setDescription('');
      setCategory('To-Do');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error creating task',
        text: 'There was an issue creating your task, please try again.',
      });
    } finally {
      setIsSubmitting(false); 
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form className="w-11/12 mx-auto border shadow-2xl my-10 task-form" onSubmit={handleSubmit}>
      <div className="w-8/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label htmlFor="title" className="text-sm">Task Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="description" className="text-sm">Task Description</label>
          <textarea
            id="description"
            placeholder="Enter task description"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="category" className="text-sm">Category</label>
          <select
            id="category"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="col-span-full">
          <label htmlFor="dueDate" className="text-sm">Due Date</label>
          <input
            id="dueDate"
            type="date"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="col-span-full flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
