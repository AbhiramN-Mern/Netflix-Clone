import React from 'react'
import './watchList.css'
import { useWatchList } from '../../context/watchListContext.jsx'
import { useNavigate } from 'react-router-dom'

function WatchList() {
  const { watchList, removeFromWatchList } = useWatchList()
  const navigate = useNavigate()

  return (
    <div className='watch-list'>
      <h1>My Watchlist</h1>
      
      {watchList && watchList.length > 0 ? (
        <div className='watch-list-items'>
          {watchList.map((movie, index) => (
            <div key={index} className='watch-list-card' onClick={() => navigate(`/player/${movie.id}`)}>
              <h3>{movie.title}</h3>
              <p>{movie.overview?.substring(0, 80) || 'No description'}...</p>
              <button className='remove-btn' onClick={() => removeFromWatchList(movie)}>
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty-watchlist'>
          <p>Your watchlist is empty</p>
          <button onClick={() => navigate('/')} className='browse-btn'>
            Browse Movies
          </button>
        </div>
      )}
    </div>
  )
}

export default WatchList
