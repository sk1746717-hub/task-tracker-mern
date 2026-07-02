// redeploy trigger
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./App.css";

import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const API = "https://task-tracker-mern-2.onrender.com";

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const getTasks = async () => {
  try {
    const res = await axios.get(API);
    console.log("API response:", res.data);

    if (Array.isArray(res.data)) {
      setTasks(res.data);
    } else if (Array.isArray(res.data.tasks)) {
      setTasks(res.data.tasks);
    } else {
      setTasks([]);
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to load tasks");
    setTasks([]);
  }
};
  useEffect(() => {
    getTasks();
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");
    setEditingId(null);
  };

  const saveTask = async () => {
    if (!title.trim() || !description.trim()) {
      toast.warning("Please fill all fields");
      return;
    }

    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate,
    };

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, taskData);
        toast.success("Task updated successfully");
      } else {
        await axios.post(API, taskData);
        toast.success("Task added successfully");
      }

      clearForm();
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority || "Medium");
    setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Task deleted successfully");
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    filtered = filtered.filter((task) =>
      (task.title || "").toLowerCase().includes((search || "").toLowerCase())
    );

    if (filter !== "All") {
      filtered = filtered.filter((task) => task.status === filter);
    }

    switch (sortBy) {
      case "Newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "Oldest":
        filtered.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "Pending":
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;

      case "Completed":
        filtered.sort((a, b) => b.status.localeCompare(a.status));
        break;

      case "High":
        filtered.sort((a, b) => {
          const order = { High: 1, Medium: 2, Low: 3 };
          return order[a.priority] - order[b.priority];
        });
        break;

      case "Medium":
        filtered.sort((a, b) => {
          const order = { Medium: 1, High: 2, Low: 3 };
          return order[a.priority] - order[b.priority];
        });
        break;

      case "Low":
        filtered.sort((a, b) => {
          const order = { Low: 1, Medium: 2, High: 3 };
          return order[a.priority] - order[b.priority];
        });
        break;

      case "DueDate":
        filtered.sort(
          (a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [tasks, search, filter, sortBy]);

  return (
    
    <div className="container py-5">
      <h1 className="app-title text-center mb-5">
    📝 Task Tracker
</h1>

      <Dashboard tasks={tasks} />

      <SearchBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        saveTask={saveTask}
        editingId={editingId}
        clearForm={clearForm}
      />

      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        deleteTask={deleteTask}
        getTasks={getTasks}
      />
    </div>
  );
}

export default App;