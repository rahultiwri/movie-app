import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [similar, setSimilar] = useState([]);

  const API_KEY = "fb6e7c371eebc9e13f61e7db71330a2c";

  // movie details
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  // trailer
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const t = data.results.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        );
        if (t) setTrailer(t.key);
      });
  }, [id]);

  // similar movies
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setSimilar(data.results || []));
  }, [id]);

  if (!movie) return <h2 style={{ color: "white" }}>Loading...</h2>;

  // ⭐ rating color
  const getColor = (rate) => {
    if (rate >= 7) return "green";
    if (rate >= 5) return "orange";
    return "red";
  };

  return (
    <div className="details-page">

      {/* 🌄 BACKDROP */}
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      ></div>

      <div className="overlay">

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate("/")}>
          ⬅ Back
        </button>

        {/* MAIN CONTENT */}
        <div className="details-container">

          <img
            className="details-img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="details-info">
            <h1>{movie.title}</h1>

            <p style={{ color: getColor(movie.vote_average) }}>
              ⭐ {movie.vote_average}
            </p>

            <p>📅 {movie.release_date}</p>

            <p className="overview">{movie.overview}</p>

            {/* 🎥 TRAILER BUTTON */}
            {trailer && (
              <button
                className="trailer-btn"
                onClick={() => setShowTrailer(true)}
              >
                ▶ Watch Trailer
              </button>
            )}
          </div>

        </div>

        {/* 🎬 SIMILAR MOVIES */}
        <h2 style={{ marginTop: "40px" }}>Similar Movies</h2>

        <div className="similar">
          {similar.slice(0, 6).map((m) => (
            <img
              key={m.id}
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
              onClick={() => navigate(`/movie/${m.id}`)}
            />
          ))}
        </div>

      </div>

      {/* 🎥 TRAILER MODAL */}
      {showTrailer && (
        <div className="modal" onClick={() => setShowTrailer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default MovieDetails;