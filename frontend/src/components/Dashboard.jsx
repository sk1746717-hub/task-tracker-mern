import {
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

function Dashboard({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="row g-4 mb-5">

      <div className="col-lg-3 col-md-6">

        <div className="dashboard-box total-box">

          <div className="dashboard-icon">
            <FaTasks />
          </div>

          <div>

            <h6>Total Tasks</h6>

            <h2>{total}</h2>

            <small>All your tasks</small>

          </div>

        </div>

      </div>

      <div className="col-lg-3 col-md-6">

        <div className="dashboard-box pending-box">

          <div className="dashboard-icon">
            <FaClock />
          </div>

          <div>

            <h6>Pending</h6>

            <h2>{pending}</h2>

            <small>Tasks remaining</small>

          </div>

        </div>

      </div>

      <div className="col-lg-3 col-md-6">

        <div className="dashboard-box completed-box">

          <div className="dashboard-icon">
            <FaCheckCircle />
          </div>

          <div>

            <h6>Completed</h6>

            <h2>{completed}</h2>

            <small>Finished tasks</small>

          </div>

        </div>

      </div>

      <div className="col-lg-3 col-md-6">

        <div className="dashboard-box progress-box">

          <div className="dashboard-icon">
            <FaChartLine />
          </div>

          <div>

            <h6>Completion</h6>

            <h2>{percentage}%</h2>

            <small>Overall progress</small>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;