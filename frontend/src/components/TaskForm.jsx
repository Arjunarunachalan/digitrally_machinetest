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
            <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">
      {submitText}
    </h2>
                <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                />

                {errors.title && (
                    <p>{errors.title}</p>
                )}
         
            <div className="mb-5">
                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                    </p>
                )}
            </div>
            <div className="mb-5">
                <label className="block mb-2 font-medium">
                    Status
                </label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-medium">
                    Due Date
                </label>

                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />

                {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.dueDate}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
                {submitText}
            </button>
               </div>
        </form>
    )

}
export default TaskForm;