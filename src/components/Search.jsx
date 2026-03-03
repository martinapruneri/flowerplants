import filterIcon from "../assets/filters.png";

export default function Search({ searchValue, onSearchChange, onOpenFilters }) {
  return (
    <div className="myplants-tools">
      <input
        className="myplants-search"
        type="text"
        placeholder="Search by name or scientific name..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button
        className="myplants-filters-btn"
        onClick={onOpenFilters}
        aria-label="Open filters"
      >
        <img src={filterIcon} alt="Filters" />
      </button>
    </div>
  );
}