import React, { useState } from "react";
import './../Styles/styles.css'
import HomeComponent from "./Home/HomeComponent";
import GameComponent from "./Game/GameComponent";

export default function FlipMainComponent() {
    const [isHonmePageVisible, setHomePageVisivility] = useState(true);
    const [difficulty, setDifficulty] = useState(0);
    const [moves, setMoves] = useState(0);
    function handlePage(dif) {
        setHomePageVisivility((pre) => !pre)
        if (dif == 1) {
            setDifficulty(8)
            setMoves(4)
        }
        else if (dif == 2) {
            setDifficulty(16)
            setMoves(60)
        }
        else if (dif == 3) {
            setDifficulty(32)
            setMoves(80)
        }
    }

    return (
        <div className="MainComponent">
            {isHonmePageVisible == true ?
                (
                    <HomeComponent handlePage={handlePage} />
                ) : (
                    <GameComponent handlePage={handlePage} difficulty={difficulty}  moves={moves} handlePage={handlePage} setHomePageVisivility={setHomePageVisivility}/>
                )}
        </div>
    )
}