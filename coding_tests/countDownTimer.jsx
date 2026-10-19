import React from 'react';
import { useState, useEffect, useRef } from 'react'

// 6. Create a Countdown Timer
//    - Start at 10 and decrease every second until it reaches 0.
//    - Challenge: Implement using both setInterval() and recursive setTimeout(). Ensure the timer stops correctly.

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(10)
    // const timeRef = useRef(null)
    useEffect(()=> {
       const timerId =  setInterval(()=> {
        setTimeLeft(prev=> {
          if(prev<=1) {
            clearInterval(timerId)
            return 0
          }
          return prev-1;
        })
        return ()=>clearInterval(timerId)
       }, 1000)
    }, [])
  return (<div>
    count:{timeLeft}
  </div>)
}

// 8. Implement a Debounce Function
   
//    - Write a function that executes only after the user stops triggering it for 500 ms.
//    - Challenge: Use closures and clearTimeout().
const DebounceSearch = () => {
  const [search, setsearchTerm] = useState("")
  useEffect(()=> {
    const timerId = setTimeout(()=> {
      console.log("debounce triggered")
    }, 500)
    return ()=> clearTimeout(timerId)
  }, [search])
  const handleChange = (e)=> {
    const {value}  = e.target
    setsearchTerm(value)
  }
  return (<div>
    <input type="text" value={search} onChange={handleChange} placeHolder="search for something"/>
  </div>)
}
function App() {
  const [count, setCount] = useState(0)
  
  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4'
    },
  };

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Hello, World!</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count {count}
        </button>
        <CountDownTimer/>
        <DebounceSearch/>
      </div>
    </div>
  )
}

export default App
