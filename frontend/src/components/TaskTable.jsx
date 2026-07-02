import { Link } from "react-router-dom";
function TaskTable({ tasks }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 ">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Due Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="border p-4 text-center">
                                No tasks found.
                            </td>
                        </tr>
                    ) : (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="border p-2">{task.title}</td>
                                <td className="border p-2">{task.description}</td>
                                <td className="border p-2">{task.status}</td>
                                <td className="border p-2">{task.dueDate}</td>
                                <td className="border p-2 space-x-2">
                                    <Link to={`/tasks/${task.id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

    );
}

export default TaskTable;