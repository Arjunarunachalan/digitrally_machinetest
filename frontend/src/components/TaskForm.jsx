import { useState } from "react";

function TaskForm({
    initialData,
    onSubmit,
    submitText
}) {
    const [formData, setFormData] = useState(initialData || {
        title: "",
        description: "",
        status: "Pending",
        dueDate: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim())
            newErrors.title = "Title is required";

        if (!formData.description.trim())
            newErrors.description = "Description is required";

        if (!formData.dueDate)
            newErrors.dueDate = "Due date is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                />

                {errors.title && (
                    <p>{errors.title}</p>
                )}
            </div>
            <div>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                {errors.description && (
                    <p>{errors.description}</p>
                )}
            </div>
            <div>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />

                {errors.dueDate && (
                    <p>{errors.dueDate}</p>
                )}
            </div>
            <button type="submit">
                {submitText}
            </button>
        </form>
    )

}
export default TaskForm;