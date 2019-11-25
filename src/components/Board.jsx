import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Cells from './Cell'
import Screen from './Screen'
import Buttons from './Buttons'
import Header from './Header'
import Sound from 'react-sound'
import soundFiles from '../sounds/soundOnRun.mp3'
import soundFiles1 from '../sounds/soundOnBomb.mp3'
import soundFiles2 from '../sounds/soundOnLeftClick.mp3'
import soundFiles3 from '../sounds/soundOnRightClick.mp3'

// assign difficulty to a state
// add sound effects
// create drop down buttons
// create a modal screen
// how's the relationship between parent and child determined? 

const MainGame = () => {

  const [table, getTable] = useState([])
  const [gameID, getGameID] = useState([])
  const [mines, getMines] = useState([])
  const [state, getState] = useState([])
  // const [easyDif, getDifficultyEasy] = useState(0)
  // const [mediumDif, getDifficultyMedium] = useState(1)
  // const [hardDif, getDifficultyHard] = useState(2)

  const createTheTable = async () => {
    const response = await axios.post('https://minesweeper-api.herokuapp.com/games', {difficulty: 0})
    getGameID(response.data.id)
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
  }

  useEffect(() => {
    createTheTable()
  }, [])

  const rightClick = async (x, y) => {
    const response = await axios.post(`https://minesweeper-api.herokuapp.com/games/${gameID}/flag`, 
    {
    row: x,
    col: y})
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
  }

  const leftClick = async (x, y) => {
    const response = await axios.post(`https://minesweeper-api.herokuapp.com/games/${gameID}/check`, {
      row: x,
      col: y
    })
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
    console.log(state)
  }

  const easy = async () => {
    const response = await axios.post('https://minesweeper-api.herokuapp.com/games', {difficulty: 0})
    getGameID(response.data.id)
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
  }
  const medium = async () => {
    const response = await axios.post('https://minesweeper-api.herokuapp.com/games', {difficulty: 1})
    getGameID(response.data.id)
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
  }
  const hard = async () => {
    const response = await axios.post('https://minesweeper-api.herokuapp.com/games', {difficulty: 2})
    getGameID(response.data.id)
    getTable(response.data.board)
    getMines(response.data.mines)
    getState(response.data.state)
  }

  // const stateMessage = () => {
  //   if (state === 'lost') {
  //     // getState(0)
  //     createTheTable()
  //   }
  //   if (state === 'won') {
  //     // getState(0)
  //     createTheTable()
  //   }
    // how can I use a return statement here passing a parameter?
  // }

  return (
    <>
    <Sound 
    url={soundFiles}
    autoLoad = {true}
    playStatus={Sound.status.PLAYING}/>
    <Header 
    />
    <Buttons 
    createTheTable = {createTheTable}
    difficulty = {easy}
    difficulty1 = {medium}
    difficulty2  = {hard}/>

    <section className="flexBox">
    <table>
      <tbody>
        {table.map((col, x) => {
          return (
            <tr key ={[x]}>
          {col.map((row, y) => {
            // force reset if not playing
            if (state == 'new' || state == 'playing') {
            return (
             <Cells 
              key={[y]}
              display={table[x][y]}
              // what functions are being run here and why are there no parameters or name?
              leftClick= {() => leftClick(x,y)}
              rightClick = {() => rightClick(x, y)}
             />
          
              )
            }
          
              else {
                if (state === 'lost') {
                return (
                  <>
                  <Cells 
                  key={[y]}
                  display={table[x][y]}/>
                  <Screen 
                  result = 'You Lost'
                  restartGame = {createTheTable}
                  />
                  </>
                )
                }
                else if (state === 'won') {
                  return (
                    <>
                    <Cells 
                    key={[y]}
                    display={table[x][y]}/>
                    <Screen 
                    result = 'You Won'
                    restartGame = {createTheTable}
                    />
                    </>
                  )
                }
              }
          })}
          </tr>
        )})}
        </tbody>
      </table>
    </section>
    </>
  )
}

export default MainGame;

