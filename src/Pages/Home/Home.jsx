import { Link } from "react-router-dom";
import TaskBoard from "../../Components/TaskBoard";
import TaskForm from "../../Components/TaskForm";

const Home = () => {
  return (
    <>
      <div className="w-11/12 mx-auto my-20">
        <div className="task-board-title flex justify-center">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold mb-6">Task Management Board</h1>
        </div>
        <TaskBoard></TaskBoard>
        <div className="text-center">
          <Link to="/task-form">
            <button className="bg-blue-700 text-white px-3 py-2 rounded-lg">
              Add Task
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
