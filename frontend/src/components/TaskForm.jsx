import {
  FaClipboardList,
  FaAlignLeft,
  FaFlag,
  FaCalendarAlt,
  FaPlusCircle,
  FaEdit,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  saveTask,
  editingId,
  clearForm,
}) {
  return (
    <div className="card shadow-lg p-4 mb-5 border-0">

      <div className="d-flex align-items-center mb-4">

        <FaClipboardList
          size={28}
          className="text-primary me-3"
        />

        <h3 className="fw-bold mb-0">
          {editingId ? "Edit Task" : "Create New Task"}
        </h3>

      </div>

      <div className="mb-3">

        <label className="form-label fw-semibold">
          Task Title
        </label>

        <div className="input-group">

          <span className="input-group-text">
            📝
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

      </div>

      <div className="mb-4">

        <label className="form-label fw-semibold">
          Description
        </label>

        <div className="input-group">

          <span className="input-group-text">
            <FaAlignLeft />
          </span>

          <textarea
            rows="4"
            className="form-control"
            placeholder="Write task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

        </div>

      </div>

      <div className="row">

        <div className="col-md-4 mb-3">

          <label className="form-label fw-semibold">
            Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">
              🟡 Pending
            </option>

            <option value="Completed">
              🟢 Completed
            </option>

          </select>

        </div>

        <div className="col-md-4 mb-3">

          <label className="form-label fw-semibold">
            Priority
          </label>

          <div className="input-group">

            <span className="input-group-text">
              <FaFlag />
            </span>

            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">
                🔴 High
              </option>

              <option value="Medium">
                🟡 Medium
              </option>

              <option value="Low">
                🟢 Low
              </option>

            </select>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <label className="form-label fw-semibold">
            Due Date
          </label>

          <div className="input-group">

            <span className="input-group-text">
              <FaCalendarAlt />
            </span>

            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

          </div>

        </div>

      </div>

      <div className="mt-4 d-flex gap-3">

        <div className="mt-4">

  <button
    className="btn btn-primary w-100 py-3 fw-bold"
    onClick={saveTask}
  >
    {editingId ? "✏️ Update Task" : "➕ Add Task"}
  </button>

  {editingId && (
    <button
      className="btn btn-secondary w-100 mt-3"
      onClick={clearForm}
    >
      ❌ Cancel
    </button>
  )}

</div>
        

      </div>

    </div>
  );
}

export default TaskForm;