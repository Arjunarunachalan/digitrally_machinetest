import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableRow from "./SortableRow";

function TaskTable({ tasks, onDelete, onDragEnd }) {
  return (
    <div className="overflow-x-auto">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 hover:bg-gray-50">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr >
                  <td colSpan={5} className="border p-4 text-center">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <SortableRow  
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default TaskTable;
