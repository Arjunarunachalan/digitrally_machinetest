import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../services/taskApi";
import { deleteTask as deleteTaskAction, setTasks } from "../redux/taskSlice";
import TaskTable from "../components/TaskTable";
import { Link } from "react-router-dom";


const TaskList = () => {
    const [filter, setFilter] = useState("All");
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            dispatch(setTasks(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);

            dispatch(deleteTaskAction(id));
        } catch (error) {
            console.log(error);
        }
    };

    const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter)
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Task List</h1>

            <Link to="/tasks/new">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Add Task
                </button>
            </Link>

            <div className="flex gap-3 mb-6">
                <button onClick={()=>setFilter("All")}>All</button>
                <button onClick={()=>setFilter("Pending")}>Pending</button>
                <button onClick={()=>setFilter("Completed")}>Completed</button>
            </div>

            <TaskTable
                tasks={filteredTasks}
                onDelete={handleDelete} />
        </div>
    )
}

export default TaskList