import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../services/taskApi";
import { deleteTask as deleteTaskAction, setTasks } from "../redux/taskSlice";
import TaskTable from "../components/TaskTable";


const TaskList = () => {
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
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Task List</h1>

            <TaskTable 
            tasks={tasks}
            onDelete={handleDelete} />
        </div>
    )
}

export default TaskList