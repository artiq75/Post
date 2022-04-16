import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
      .then(response => response.json())
      .then(setPosts)
  }, [])

  return (
    <>
      <h1>Les dernies articles:</h1>
      <ul>
        {posts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <article>
              <h2>{post.title}</h2>
            </article>
          </Link>
        ))}
      </ul>
    </>
  )
}