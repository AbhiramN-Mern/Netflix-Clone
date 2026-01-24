import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
function TitleCards({tittle,category}) {
  const[apiData, setApiData] = useState([])
  const cardsref = useRef(null)

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTAyOTE5NTQ2NmFlNmYyODhiNjc1ZDZmZmFkYjhhMSIsIm5iZiI6MTc2OTE3NjgwOS4yMTcsInN1YiI6IjY5NzM3ZWU5ZjlhYWY0YjQ1Zjk0MmE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-psXAiI7fdXGNavqcV9rUScTzsAToPtXx87zOH4jU4w'
  }
};



  const handleWheel = (event) => {
    event.preventDefault()
    cardsref.current.scrollLeft += event.deltaY
  }

  useEffect(() => {
  
fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(data => setApiData(data.results))
  .catch(err => console.error(err));
    cardsref.current.addEventListener('wheel', handleWheel, { passive: false })

  }, [])

  return (
    <div className='TitleCards'>
      <h2>{tittle?tittle:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsref}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.name} />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
