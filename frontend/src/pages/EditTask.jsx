import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { getTaskById, updateTask } from "../services/taskApi";
import { updateTask as updateTaskAction } from "../redux/taskSlice";

const EditTask = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    useEffect(() => {
        fetchTask();
    }, [id]);

    const fetchTask = async () => {
        try {
            const response = await getTaskById(id);
            setTask(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    if (!task) {
        return <h2>Loading...</h2>;
    }

    const handleUpdate = async (formData) => {
        try {
            const response = await updateTask(id, formData);
            dispatch(updateTaskAction(response.data));
            navigate("/tasks");
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            submitText="Update Task"
        />
    )
}

export default EditTask;