import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "../pages/TaskList";
import CreateTask from "../pages/CreateTask";
import EditTask from "../pages/EditTask";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<CreateTask />} />
        <Route path="/tasks/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;