import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";

function SortableRow({ task, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <td className="border p-2">{task.title}</td>
      <td className="border p-2">{task.description}</td>
      <td className="border p-2">{task.status}</td>
      <td className="border p-2">{task.dueDate}</td>

      <td className="border p-2 space-x-2">
        <Link to={`/tasks/${task.id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1 rounded">
            Edit
          </button>
        </Link>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600  text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default SortableRow;