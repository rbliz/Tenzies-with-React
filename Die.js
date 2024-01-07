import React from "react"

export default function Die(props) {
    const styles = {
        border: props.isHeld ? "3.5px solid red" : "#aaa"
    }
    
    let shape = ""
    if(props.value === 1){
        shape = "one"
    }
   else if(props.value === 2){
       shape = "two"
   }else if(props.value === 3){
       shape = "three"
   }else if(props.value === 4){
       shape = "four"
   }else if(props.value === 5){
       shape = "five"
   }else if(props.value === 6){
       shape = "six"
   }

    return (
<div 
        className="die-face" 
        style={styles}
        onClick={props.holdDice}
    >
        <p className={`shape-${shape}`}></p>
</div>
    )
    
}

 
 