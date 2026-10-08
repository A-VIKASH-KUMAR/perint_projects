import React from 'react';
import { useState, useEffect } from 'react'

interface PostData {
  id: number;
  title: string;
  body:string
}

interface PostsResponse {
  posts: PostData[];
}
const PostCard = (props:PostData) => {
  return (<div>
  <h1>{props.title}</h1>
  <ul>
  <li>{props.body}</li>
  </ul>
  </div>)
}
const fetchPosts = async (search: string): Promise<PostsResponse | undefined> => {
  try {
    const posts: Response = await fetch(`https://dummyjson.com/posts/search?q=${search}`)
    const data: PostsResponse = await posts.json()
    console.log('data', data)
    return data
  } catch (error) {
    console.error('error occured to fetch posts data', error)
    return undefined
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [debounceSearchTerm, setDebouncedSearchTerm] = useState('')
  const [postsData1, setPostsData1] = useState<PostData[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4',
    },
  }

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const postsSearchData = async () => {
        setDebouncedSearchTerm(searchTerm)
        const postsData = await fetchPosts(searchTerm)
        return postsData
      }

      const postsData = await postsSearchData()
      setPostsData1(postsData?.posts ?? [])
    }, 2000)

    return () => clearTimeout(timerId)
  }, [searchTerm])

  console.log('posts data', postsData1)

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Hello, World!</h1>
      <p>Debounced : {debounceSearchTerm}</p>
      <div>
        <input  type="text" value={searchTerm}  onChange={handleChange}/>
        <div>
          <h1>posts data:</h1>
          {/* Map directly over the array stored in state, and return the elements */}
          {postsData1.map(post => (
            <PostCard key={post.id} {...post}/>

          ))}
          
        </div>
      </div>
    </div>
  )
}
export default App
