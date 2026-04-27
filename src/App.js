import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MovieCard from "./component/MovieCard";
import SearchBar from "./component/SearchBar";
import Footer from "./component/Footer";
import MovieDetails from "./component/MovieDetails";
import ChatBot from "./component/ChatBot";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const API_KEY = "fb6e7c371eebc9e13f61e7db71330a2c";

  // 🎬 normal search / default movies
  const getMovies = (query = "popular") => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  };

  // 🤖 chatbot recommendations
  const getRecommendations = async (genreId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    const data = await res.json();
    setMovies(data.results || []);
  };

  // 🔥 initial load
  useEffect(() => {
    getMovies("popular");
  }, []);

  // 🔍 search effect
  useEffect(() => {
    if (search === "") {
      getMovies("popular");
    } else {
      getMovies(search);
    }
  }, [search]);

  return (
    <Router>
      <Routes>

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={
            <div className="app">

              <h1 className="logo">🍿 MovieApp</h1>

              {/* 🔍 SEARCH */}
              <SearchBar setSearch={setSearch} />

              {/* 🎬 MOVIE LIST */}
              <div className="movies">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <Footer />

              {/* 🤖 CHATBOT (MAIN ADDITION) */}
              <ChatBot onRecommend={getRecommendations} />

            </div>
          }
        />

        {/* ================= DETAILS PAGE ================= */}
        <Route path="/movie/:id" element={<MovieDetails />} />

      </Routes>
    </Router>
  );
}

export default App;