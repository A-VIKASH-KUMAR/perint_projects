import React from 'react';
import { useState, useEffect } from 'react'

const ShowCounts = (props) => { 
  console.log(props) 
const [number, setNumber] = useState([props.number]);
let result =[]
useEffect(()=> {
 const timerId =  setTimeout(()=> { 
  
  // Append the next number to the array
      setNumber((prevNumbers) => {
        let result = [...prevNumbers]
        let nextNumber = prevNumbers[prevNumbers.length -1] +1;
        result.push(nextNumber)
        // Limit the array size if needed, e.g., stop at 10
        if (result.length > 10) return prevNumbers; 
        return result;
      });
  }, 1000) 
return ()=>clearTimeout(timerId)
}, [number])
 

return ( <h1>Interval [{number.join(",")}]</h1> ) 
} 

function App() { const [count, setCount] = useState(0) 
const props = { number:1 } 
const styles = { main: { padding: '20px', }, title: { color: '#5C6AC4' }, }; 
return ( <div style={styles.main}> <h1 style={styles.title}>Hello, World!</h1> 
<div> <button onClick={() => setCount((count) => count + 1)}> count {count} </button> 
<ShowCounts {...props}/> </div> </div> ) }

export default App
