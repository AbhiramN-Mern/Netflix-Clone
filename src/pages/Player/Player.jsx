import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useWatchList } from '../../context/watchListContext.jsx'
import { toast } from 'react-toastify'
function Player() {
  const {watchList,addToWatchList,removeFromWatchList}=useWatchList()
  console.log(watchList)
  

  const {id} = useParams()
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    overview: "",
    runtime: "",
    vote_average: "",
    genres: [],
    release_date: "",
    budget: "",
    revenue: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTAyOTE5NTQ2NmFlNmYyODhiNjc1ZDZmZmFkYjhhMSIsIm5iZiI6MTc2OTE3NjgwOS4yMTcsInN1YiI6IjY5NzM3ZWU5ZjlhYWY0YjQ1Zjk0MmE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-psXAiI7fdXGNavqcV9rUScTzsAToPtXx87zOH4jU4w'
  }
};

useEffect(()=>{
  // Fetch trailer
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    if(res.results && res.results.length > 0) {
      setApiData(res.results[0])
    }
  })
  .catch(err => console.error(err));

  // Fetch movie details
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    setMovieDetails({
      title: res.title || "",
      overview: res.overview || "",
      runtime: res.runtime || "",
      vote_average: res.vote_average || "",
      genres: res.genres || [],
      release_date: res.release_date || "",
      budget: res.budget || "",
      revenue: res.revenue || ""
    })
  })
  .catch(err => console.error(err));
},[id])

  return (
    <div className='Player'>
      <Link to="/"><img src={back_arrow_icon} alt="" /></Link>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

      <div className="movie-details">
        <div className="details-container">
          <h1>{movieDetails.title}</h1>
          <button className='watchLater' onClick={()=>{
            addToWatchList({id:id, title: movieDetails.title, overview: movieDetails.overview, image: movieDetails.poster_path})
            toast.success(`${movieDetails.title} added to watchlist!`, {
              position: "bottom-right",
              autoClose: 2000,
            })
          }}>add to watchList</button>
          
          <div className="movie-meta">
            <span className="rating"> {movieDetails.vote_average ? parseFloat(movieDetails.vote_average).toFixed(1) : 'N/A'}/10</span>
            <span className="release-date"> {movieDetails.release_date}</span>
            <span className="runtime"> {movieDetails.runtime} min</span>
          </div>

          <div className="genres">
            {movieDetails.genres && movieDetails.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre.name}</span>
            ))}
          </div>

          <div className="overview">
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
          </div>

          <div className="budget-revenue">
            {movieDetails.budget > 0 && <p><strong>Budget:</strong> ${(movieDetails.budget / 1000000).toFixed(1)}M</p>}
            {movieDetails.revenue > 0 && <p><strong>Revenue:</strong> ${(movieDetails.revenue / 1000000).toFixed(1)}M</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
