import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Http } from '../utils/http'

export function Post() {
  let params = useParams()
  const [state, setState] = useState({
    post: {},
    user: {},
    comments: [],
  })

  useEffect(() => {
    Http.get(`/posts/${params.postId}`).then((post) => {
      Http.get(`/users/${post.userId}`).then((user) => {
        Http.get(`/posts/${post.id}/comments`).then((comments) => {
          setState({
            post,
            user,
            comments,
          })
        })
      })
    })
  }, [])

  return (
    <>
      <article>
        <header>
          <h1>{state.post.title}</h1>
          <p>
            publier par <em>{state.user.name}</em>
          </p>
        </header>
        <div>{state.post.body}</div>
      </article>
      <h2>Commentaires</h2>
      <ul>
        {state.comments.map((comment) => (
          <li key={comment.id}>
            <article>
              <p>
                <strong>{comment.email.substring(0, comment.email.indexOf('@'))}</strong>
                <br />
                {comment.body}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
