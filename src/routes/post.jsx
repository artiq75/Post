import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function Post() {
  const [post, setPost] = useState({})
  const [user, setUser] = useState({})
  let params = useParams()

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      .then((response) => response.json())
      .then(setPost)
  }, [])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((response) => response.json())
      .then(setUser)
  }, [post])

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>publier par <em>{user.name}</em></p>
      </header>
      <div>{post.body}</div>
    </article>
  )
}
