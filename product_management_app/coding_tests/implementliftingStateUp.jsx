import React from 'react';
import { useState } from 'react'

const CardRow = ({title,children,isActive,onShow}) => {
  return (
    <div>
      <h1>{title}</h1>
      {isActive? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </div>
  )
}
const Accordian = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div>
    <section>
        <CardRow  title="inital heading" isActive={activeIndex===0} onShow={()=>setActiveIndex(0)}>hello there, this is a child</CardRow>
        <CardRow  title="inital heading 2" isActive={activeIndex===1} onShow={()=>setActiveIndex(1)}>hello there, this is a child 2</CardRow>
    </section>
    </div>
  )
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
        <Accordian/>
      </div>
    </div>
  )
}

export default App
