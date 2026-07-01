function SearchBar({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="row mb-4">

      <div className="col-md-5">
        <input
          className="form-control"
          placeholder="🔍 Search task by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="col-md-4">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
          <option value="Pending">Pending First</option>
          <option value="Completed">Completed First</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
          <option value="DueDate">Due Date</option>
        </select>
      </div>

    </div>
  );
}

export default SearchBar;