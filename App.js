import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Footer from "./Footer"
import Modal from "./Modal"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [isRunning, setIsRunning] = React.useState(false)
    
    
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    
    const space = " "
    
    React.useEffect(()=>{
        let intervalId = 0
        if(isRunning){
            intervalId = setInterval(()=> setTime(time + 1), 10)
        }
        return ()=> clearInterval(intervalId)
        },[isRunning, time])
    
    React.useEffect(()=>{
        if(tenzies === false){
            setIsRunning(true)
        }
    },[tenzies])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setIsRunning(false)
        }
    }, [dice])
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
      
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 15; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
        }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(-1)
            setTime(0)            
            
        }
          setRolls(prevCount => prevCount + 1)
        
    }
 
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
   
    const diceElements = dice.map(die => 
    (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            {tenzies && <Modal />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all shapes are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="commands">
             <div className="rolls">
                  <p>Rolls: {rolls}</p>
                </div>
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
             <div className="timer">
                    <p>Time:{space}
                    {minutes.toString().padStart(2,"0")}:
                    {seconds.toString().padStart(2,"0")}:
                    {milliseconds.toString().padStart(2,"0")}
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}