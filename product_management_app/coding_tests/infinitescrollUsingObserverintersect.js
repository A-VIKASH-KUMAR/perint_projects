import React from 'react';
import { useState, useEffect, useRef } from 'react'

const fetchPosts = async ({ limit, offset }) => {
  try {
    const postsFetch = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${offset}&select=title,reactions,userId`)
    const posts = await postsFetch.json()
    return posts
  } catch (error) {
    console.error("error occoured to fetch posts", error)
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [postsData, setPostsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setpage] = useState(1)
  const limit = 10
  const offset = (page - 1) * limit
  const elemRef = useRef(null)

  const fetchPostsData = async () => {
    const data = await fetchPosts({ limit, offset })

    // Fix 3: the API returns an object, so check data.posts.length
    // (and guard against a failed fetch returning undefined)
    if (!data || data.posts.length === 0) {
      setIsLoading(false)
      return
    }
    setPostsData(prev => [...prev, ...data.posts])
    // Fix 2: removed setpage(...) here so fetching doesn't loop on itself
  }

  // Fetches whenever the page changes
  useEffect(() => {
    fetchPostsData()
  }, [page])

  // Watches the "Loading..." element and bumps the page when it's visible
  useEffect(() => {
    const currentTarget = elemRef.current
    if (!currentTarget) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setpage(prev => prev + 1)   // observer only bumps the page
      }
    }, { threshold: 1.0 })          // removed the invalid `root`

    observer.observe(currentTarget) // Fix 1: observe outside the callback

    return () => observer.unobserve(currentTarget)
  }, [page, isLoading])

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
        <ul>
          {postsData.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
      {isLoading ? <div className="footer-loading" ref={elemRef}>Loading...</div> : ""}
    </div>
  )
}

export default App