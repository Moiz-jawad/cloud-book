const DropdownButton = ({ tag, setTag }) => {
  const categories = ["General", "Work", "Personal", "Important"];

  return (
    <div className="dropdown">
      <button
        className="btn btn-dark dropdown-toggle w-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {tag || "Select Category"}
      </button>
      <ul className="glass-card dropdown-menu w-100">
        {categories.map((category) => (
          <li key={category}>
            <button
              className="dropdown-item text-muted"
              type="button"
              onClick={() => setTag(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownButton;
