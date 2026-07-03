
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../services/taskApi";
import { deleteTask as deleteTaskAction, setTasks } from "../redux/taskSlice";
import Table from "../components/Table";
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

    const filteredTasks =
        filter === "All"
            ? tasks
            : tasks.filter((task) => task.status === filter);

    const columns = [
        {
            header: "Title",
            accessorKey: "title",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        {
            header: "Status",
            cell: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-sm ${row.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            header: "Due Date",
            accessorKey: "dueDate",
        },
        {
            header: "Actions",
            cell: (row) => (
                <div className="space-x-2">
                    <Link to={`/tasks/${row.id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Edit
                        </button>
                    </Link>

                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];


    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Task List
                </h1>

                <Link to="/tasks/new">
                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                        + Add Task
                    </button>
                </Link>
            </div>
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setFilter("All")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("Pending")}
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Pending
                </button>

                <button
                    onClick={() => setFilter("Completed")}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Completed
                </button>
            </div>
            <Table
                columns={columns}
                data={filteredTasks}
            />
        </div>
    )
}

export default TaskList