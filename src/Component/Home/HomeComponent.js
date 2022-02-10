import React, { useRef, useState } from "react";

export default function HomeComponent(props) {
    const [state, setState] = useState(false)
    let isHovering=false;
    function handleOnHover() {
        setState((pre) => !pre)
        setTimeout(() => {
            //setState((pre) => !pre)
        }, 3000)
    };

    function handleClick(){
        setState(true)
    }

    function handleHover(d){
        console.log(d)
        if(d==false){
            setState(false)
        }
        isHovering=d;
    }
    return (
        <div className="divMain_FMC_Outer">
            <div className="divMain_FMC">

            <h1 id="h1_FMC">Flip Game</h1>
                {state == false ? (
                    <button id="btn_play" onClick={handleClick}>Play Now</button>

                ) : (
                    <div className="div_level_outer_FMC" onMouseOver={()=>handleHover(true)} onMouseLeave={()=>handleHover(false)}>
                        <h1>Select Level</h1>
                        <div className="div_level_FMC">
                            <button id="level_one" onClick={() => { props.handlePage(1); props.setHomePageVisivility(false) }}>1</button>
                            <button id="level_two" onClick={() => { props.handlePage(2); props.setHomePageVisivility(false) }}>2</button>
                            <button id="level_three" onClick={() => { props.handlePage(3); props.setHomePageVisivility(false) }}>3</button>
                        </div>
                    </div>
                )}


            </div>

        </div>
    )
}