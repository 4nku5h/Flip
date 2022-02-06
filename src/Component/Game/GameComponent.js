import React, { useEffect, useRef, useState } from "react";

export default function GameComponent(props) {
  const ref_div = useRef(null)
  const [timer, setTimer] = useState(props.moves);
  const [moves, setMoves] = useState(props.moves);
  const [ar, setArray] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [lastElement, setLastElement] = useState(null);
  const [score, setScore] = useState(0);
  const [isResultVisibe, setVisivility] = useState(false)
  const [bestScore, setBestScore] = useState(null);
  const [flipcnt, setFlipCnt] = useState(0);
  const key = "BEST_SCORE;"
  let xr=new Array(32)

  useEffect(() => {
    //mount
    let cols = "1fr ".repeat(props.difficulty / 4)
    ref_div.current.style.gridTemplateColumns = cols;
    let id =startTimer()
    setArray(getGameUniqueArray())
    setBestScore(getScoreFromLocalStorage())
    return (
      //unmount
      clearInterval(id)
    )
  }, [])

  //8-4,  16-8, 32-16
  function startTimer() {
    let id = setInterval(() => {
      setTimer((pre) => {
        if (pre == 0) {
          setTimer(0)
          clearInterval(id)
        }
        return pre - 1;
      })
    }, 1000)
    return id;
  }

  function handleClick(event) {
    var element = event.currentTarget;
    if (element.className === "flip-box-inner") {

      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        let val = element.getAttribute("value")
        element.style.transform = "rotateY(180deg)";
        if (isSelected === false) {
          setSelected(true)
          setLastElement(element)
        } else if (element != lastElement) {
          setMoves((m) => m - 1)
          if (lastElement.getAttribute("value") == val) {
            setScore((sc) => sc + 1);
            setFlipCnt((pre) => {
              return pre + 2
            })
            setTimeout(() => {
              lastElement.style.visibility = "hidden"
              element.style.visibility = "hidden"
            }, 500)
            setLastElement(null);
            setSelected(false)
          } else {
            setTimeout(() => {
              element.style.transform = "rotateY(0deg)";
              lastElement.style.transform = "rotateY(0deg)";
              setSelected(false)
            }, 500)
          }

        }
      }
    }
  };

  function getGameUniqueArray() {
    let d1 = "ABCD";
    let ar = d1.repeat(props.difficulty / 4).split("");
    function shuffleArray() {
      for (let i = 0; i < props.difficulty / 4; i++) {
        let index = getRandomNumber();
        let temp = ar[i]
        ar[i] = ar[index];
        ar[index] = temp;
      }
    }
    shuffleArray()
    return ar;
  }
  function changeLevel() {
    setTimeout(() => {
      let level = currentLevel();
      if (level <= 2) {
        props.setHomePageVisivility(true)
        props.handlePage(level + 1)
        props.setHomePageVisivility(false)
      }
    }, 4000)

  }
  function currentLevel() {
    if (props.difficulty == 8) return 1;
    if (props.difficulty == 16) return 2;
    if (props.difficulty == 32) return 3;
  }
  function getRandomNumber() {
    return Math.floor(Math.random() * props.difficulty);
  }
  function savetoLocalStorage(val) {
    let level = currentLevel();
    if (val > localStorage.getItem(key + level)) localStorage.setItem(key + level, val);
  }
  function getScoreFromLocalStorage() {
    let level = currentLevel()
    return localStorage.getItem(key + level);
  }
  function calcOverallScore() {
    let total = (props.moves * 3)
    let sc = (score / props.difficulty / 2) * 100;
    let curr = sc + timer + moves
    let res = parseInt((curr / total) * 100);
    savetoLocalStorage(res)
    return res;
  }

  function handleShowResult() {
    setVisivility((pre) => !pre);
    setScore(calcOverallScore())
    changeLevel()
  }
  return (
    <div className="GameComponent">
      <>

        {timer > 0 && moves > 0 && flipcnt < props.difficulty ? (
          <>
            <div className="Nav">
              <div id="appName">Flip Game</div>
              <div className="div_details_GC">
                <h3>Moves left : {moves}</h3>
                <h3>Time left : {timer}</h3>
              </div>
            </div>

            <h1 id="btn_exit_GC" onClick={() => props.setHomePageVisivility(true)}>close</h1>

            <div className="divMain_grid_GC" ref={ref_div}>

              {ar != null ? (

                ar.map((i,j) => {
                  return (
                    <div className="flip-box">
                      <div className="flip-box-inner" onClick={handleClick} value={i}>
                        <div className="flip-box-front" >
                          <h1 id="h1_hide"></h1>
                        </div>
                        <div className="flip-box-back">
                          <h1 id="h1_unhide">{i}</h1>
                        </div>
                      </div>
                    </div>
                  )
                })

                //
              )
                :
                (
                  <><h1>Loading..</h1></>
                )
              }

            </div>
          </>

        ) : (
          <div className="div_results_GC">

            <h1 id="btn_exit_GC" onClick={() => props.setHomePageVisivility(true)}>close</h1>
            {isResultVisibe == true ? (
              <>
                <h1>Score Board</h1>
                <h3>Your Score: {score}</h3>
                <h3>Best Score: {bestScore}</h3>
              </>

            ) : (
              <>
                <h1 id="Gameover">Game Over</h1>
                <button id="btn_showRes_GC" onClick={() => handleShowResult()}>Show Results</button>
              </>
            )}
          </div>


        )}

      </>
    </div>

  )
}