import { useState } from "react";

import emptySun from "../assets/emptysun.png";
import fullSun from "../assets/fullsun.png";
import emptyDrop from "../assets/emptydrop.png";
import fullDrop from "../assets/fulldrop.png";
import smileIcon from "../assets/smile.png";

function RatingPicker({ value, onChange, fullIcon, emptyIcon, ariaLabel }) {
  const handlePick = (n) => {
    onChange(value === n ? 0 : n);
  };

  return (
    <div className="filter-rating" role="radiogroup" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const filled = n <= value;

        return (
          <button
            key={n}
            type="button"
            className="filter-rate-btn"
            onClick={() => handlePick(n)}
            aria-checked={value === n}
            role="radio"
            title={`${n}/5`}
          >
            <img
              className="filter-rate-icon"
              src={filled ? fullIcon : emptyIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        );
      })}

      <span className="filter-rate-value">{value}/5</span>
    </div>
  );
}

export default function Filter({ onClose, onApply }) {
  const [light, setLight] = useState(0);
  const [water, setWater] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const apply = () => {
    onApply?.({ light, water, difficulty });
    onClose?.();
  };

  const clearAll = () => {
    setLight(0);
    setWater(0);
    setDifficulty("");
  };

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
        <div className="filter-title">
          <h3>Filter by:</h3>
        </div>

        <div className="popup-body">
          {/* LIGHT */}
          <div className="filter-block">
            <div className="filter-label-small">Light</div>
            <RatingPicker
              value={light}
              onChange={setLight}
              fullIcon={fullSun}
              emptyIcon={emptySun}
              ariaLabel="Filter by light level"
            />
          </div>

          {/* WATER */}
          <div className="filter-block">
            <div className="filter-label-small">Water</div>
            <RatingPicker
              value={water}
              onChange={setWater}
              fullIcon={fullDrop}
              emptyIcon={emptyDrop}
              ariaLabel="Filter by water level"
            />
          </div>

          {/* DIFFICULTY */}
          <div className="filter-block">
            <div className="filter-label-small">Difficulty</div>

            <div className="filter-difficulty-row">
              <img
                className="filter-difficulty-icon"
                src={smileIcon}
                alt=""
                aria-hidden="true"
              />

              <select
                className="filter-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="" disabled>
                  Difficulty level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="filter-actions">
            <button
              type="button"
              className="filter-btn filter-secondary-btn"
              onClick={clearAll}
            >
              Clear
            </button>

            <button
              type="button"
              className="filter-btn filter-close-btn"
              onClick={apply}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}