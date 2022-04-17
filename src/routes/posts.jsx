import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Http } from '../utils/http'
import { useAsyncEffect } from '../hooks'

export function Posts() {
  const [posts, setPosts] = useState([])

  useAsyncEffect(async () => {
    const posts = await Http.get('/posts')
    setPosts(posts)
  }, [])

  return (
    <>
      <h1>Les dernies articles:</h1>
      <ul>
        {posts.map((post) => (
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
