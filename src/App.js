import React, { useEffect, useState } from "react";
import axios from "axios";
import Episode from "./components/Episode";
import Pagination from "./components/Pagination";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [episode, setEpisode] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodePerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [before, setBefore] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const res = await axios.get("https://rickandmortyapi.com/api/episode");
      setEpisode(res.data.results);
      const res1 = await axios.get(
        "https://rickandmortyapi.com/api/episode?page=2"
      );
      // setEpisode(res1.data.results);
      setEpisode(episode => episode.concat(res1.data.results));
    };
    fetchEpisodes();
  }, []);

  // get Episodes
  const indexOfLastEpisode = currentPage * episodePerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodePerPage;
  const currentEpisode = before
    ? null
    : episode.slice(indexOfFirstEpisode, indexOfLastEpisode);

  // set Episode Pages
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // form data
  const handleSubmit = async e => {
    e.preventDefault();
    setBefore(true);
    // console.log(`Submitting Name ${search}`);
    const get = await axios.get(
      `https://rickandmortyapi.com/api/episode/?name=${search}`
    );
    // console.log("search", get);
    setEpisode(get.data.results);
  };

  return (
    <main>
      <section className="jumbotron text-center">
        <div className="container">
          <h1>The Rick and Morty Episode's</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Episode name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {before ? (
        <Episode episodes={episode} />
      ) : (
        <>
          <Episode episodes={currentEpisode} />
          <Pagination
            episodePerPage={episodePerPage}
            totalEpisode={episode.length}
            paginate={paginate}
          />
        </>
      )}
    </main>
  );
};

export default App;
