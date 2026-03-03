import { useNavigate } from "react-router-dom";

export default function PlantItem({ plant }) {
  const navigate = useNavigate();

  return (
    <article className="myplant-card">
      <div className="myplant-media">
        {plant.img ? (
          <img
            src={plant.img}
            alt={plant.name}
            className="myplant-img"
          />
        ) : (
          <div className="myplant-placeholder">
            No image
          </div>
        )}

        <div className="myplant-overlay">
          <div>
            <div className="myplant-name">
              {plant.name}
            </div>
            <div className="myplant-scientific">
              {plant.scientific}
            </div>
          </div>

          <button
            type="button"
            className="myplant-open-btn"
            onClick={() => navigate(`/my-plants/${plant.id}`)}
            aria-label={`Open ${plant.name}`}
          >
            ›
          </button>
        </div>
      </div>
    </article>
  );
}