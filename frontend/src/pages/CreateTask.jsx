import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import TaskForm from "../components/TaskForm";
import { createTask } from "../services/taskApi";
import { addTask } from "../redux/taskSlice";

const CreateTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreate  = async (formData) =>{
try {
    const response = await createTask(formData)
    dispatch(addTask(response.data));
    navigate("/tasks");

} catch (error) {
    console.log(error);
}
    }

    return (
        <TaskForm 
        initialData={{
            title: "",
             description: "",
            status: "Pending",
            dueDate: ""
        }}
        onSubmit={handleCreate}
        submitText="Create Task"
        />
    );
};

export default CreateTask;