import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Player() {
  const {id} = useParams()
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTAyOTE5NTQ2NmFlNmYyODhiNjc1ZDZmZmFkYjhhMSIsIm5iZiI6MTc2OTE3NjgwOS4yMTcsInN1YiI6IjY5NzM3ZWU5ZjlhYWY0YjQ1Zjk0MmE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-psXAiI7fdXGNavqcV9rUScTzsAToPtXx87zOH4jU4w'
  }
};
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    if(res.results && res.results.length > 0) {
      setApiData(res.results[0])
    }
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
    </div>
  )
}

export default Player
