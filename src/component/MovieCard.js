import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="movie" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h3 className="title">{movie.title}</h3>

      <div className="movie-info">
        ⭐ {movie.vote_average} | 📅 {movie.release_date}
      </div>
    </div>
  );
}

export default MovieCard;