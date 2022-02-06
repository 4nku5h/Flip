import React from "react";

export default function HomeComponent(props) {

    function handleClick(event) {
        var element = event.currentTarget;
        if (element.className === "div_card") {
            if (element.style.transform == "rotateY(180deg)") {
                element.style.transform = "rotateY(0deg)";
            }
            else {
                element.style.transform = "rotateY(180deg)";
            }
        }
    };

    return (
        <>
        <h1>Flip Game</h1>
        <h4>Press [P] to start the Game</h4>
            <div className="divMain_FMC">
                <button id="btn_card">F</button>
                <button id="btn_card">L</button>
                <button id="btn_card">I</button>
                <div className="div_card" onClick={handleClick}>

                    <div className="front">
                        <button id="btn_card">P</button>
                    </div>
                    <div className="back">
                        <button onClick={() => props.handlePage(1)}>Easy</button>
                        <button onClick={() => props.handlePage(2)}>Medium</button>
                        <button onClick={() => props.handlePage(3)}>Hard</button>
                    </div>
                </div>
            </div>
        </>
    )
}