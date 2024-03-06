import React from 'react'
import { useSelector } from 'react-redux'

const Leaderboard = () => {
  const score = useSelector((state: any) => state.questionSlice.score)
  const nickname = useSelector((state: any) => state.playerSlice.nickname)
  return (
    <div>
      <h1>Leaderboard</h1>
      {nickname && <p>{nickname}</p>}
      {score && <p>{score}</p>}
    </div>
  )
}

export default Leaderboard
