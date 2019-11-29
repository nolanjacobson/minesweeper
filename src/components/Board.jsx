import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cells from './Cell'
import Buttons from './Buttons'
import Header from './Header'
import Sound from 'react-sound'
import soundFiles from '../sounds/soundOnRun.mp3'

const MainGame = () => {
  const [table, getTable] = useState([])
  const [gameID, getGameID] = useState([])
  const [mines, getMines] = useState([])
  const [state, getState] = useState([])
  
  const createGame = async diff => {
    const response = await axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: diff }
    )
    getGameID(response.data.id)
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
  }
  useEffect(() => {
    createGame(0)
  }, [])

  const clicked = async (action, x, y) => {
    const response = await axios.post(
      `https://minesweeper-api.herokuapp.com/games/${gameID}/${action}`,
      {
        row: y,
        col: x
      }
    )
    getTable(response.data.board)
    getMines(response.data.mines) 
    getState(response.data.state)
  }

  const flagCell = (x, y) => {
    clicked('flag', x, y)
  }

  const handleLeftClick = (x, y) => {
    clicked('check', x,y)
  }

  const handleRightClick = (e, x, y) => {
    e.preventDefault()
    flagCell(x, y)
  }
  return (
    <>
      {/* <Sound
        url={soundFiles}
        autoLoad={true}
        playStatus={Sound.status.PLAYING}
      /> */}
      <Header 
      title = "Minesweeper" />
      {state === 'won' ? (
          <Header 
          title = "You Won"/>
        ) : (
          <></>
        )}
        {state === 'lost' ? (
           <Header 
           title = "You Lost"/>
        ) : (
          <></>
        )}

      {state === 'new' || state === 'playing' ? (
      <Buttons
      emoji = "😃"
      restartGame={() => createGame(0)}
      difficulty={() => createGame(0)}
      difficulty1={() => createGame(1)}
      difficulty2={() => createGame(2)}
      />
      ) : (
      <Buttons
      emoji = "😢"
      restartGame={() => createGame(0)}
      difficulty={() => createGame(0)}
      difficulty1={() => createGame(1)}
      difficulty2={() => createGame(2)}
    />)}

      <section className="flexBox">
        <table>
          <tbody>
            {table.map((row, y) => {
              return (
                <tr key={y}>
                  {row.map((col, x) => {
                    return (
                      <>
                        {state === 'new' || state === 'playing' ? (
                         <td
                         key={x}
                         onClick={() => handleLeftClick(x,y)}
                         onContextMenu={e => handleRightClick(e, x, y)}
                          >
                          <Cells data={col}/>
                          </td>
                        ) : (
                         <td key={x}>
                           <Cells data={col}/>
                         </td>
                        )}
                      </>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default MainGame
