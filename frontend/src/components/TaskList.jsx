import axios from "axios";
import {
  FaCheckCircle,
  FaEdit,
  FaTrashAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

function TaskList({ tasks, editTask, deleteTask, getTasks }) {
  const API = "http://localhost:5000/api/tasks";

  // One Click Complete
  const completeTask = async (task) => {
    try {
      await axios.put(`${API}/${task._id}`, {
        title: task.title,
        description: task.description,
        status: "Completed",
        priority: task.priority,
        dueDate: task.dueDate,
      });

      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="tasks-heading mb-4">
  📋 All Tasks
</h2>

      <div className="row">
        {tasks.length === 0 ? (
          <h3 className="text-center text-danger">
            No Tasks Found
          </h3>
        ) : (
          tasks.map((task) => (
            <div className="col-md-6 mb-4" key={task._id}>
              <div className="card shadow h-100">
                <div className="card-body">

                  <h4>{task.title}</h4>

                  <p>{task.description}</p>

                  <div className="mb-2">

                    <span
                      className={
                        task.status === "Completed"
                          ? "badge bg-success me-2"
                          : "badge bg-warning text-dark me-2"
                      }
                    >
                      {task.status}
                    </span>

                    <span
                      className={
                        task.priority === "High"
                          ? "badge bg-danger me-2"
                          : task.priority === "Medium"
                          ? "badge bg-warning text-dark me-2"
                          : "badge bg-info text-dark me-2"
                      }
                    >
                      {task.priority}
                    </span>

                  </div>

                  {task.dueDate && (
                    <p className="mb-2 text-secondary">
  <FaCalendarAlt className="me-2" />
  {new Date(task.dueDate).toLocaleDateString()}
</p>
                  )}

                  <p className="text-muted small">
  <FaClock className="me-2" />
  {new Date(task.createdAt).toLocaleString()}
</p>

                  <div className="mt-3">

                    {task.status !== "Completed" && (
                      <button
                    className="btn btn-success me-2"
                    onClick={() => completeTask(task)}
                    >
                     <FaCheckCircle className="me-2" />
                     Complete
                    </button>
                    )}

                    <button
  className="btn btn-warning me-2"
  onClick={() => editTask(task)}
>
  <FaEdit className="me-2" />
  Edit
</button>

                    <button
  className="btn btn-danger"
  onClick={() => deleteTask(task._id)}
>
  <FaTrashAlt className="me-2" />
  Delete
</button>

                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default TaskList;