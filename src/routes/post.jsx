import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Comment } from '../components/Comment'
import { useAsyncEffect } from '../hooks'
import { Http } from '../utils/http'

export function Post() {
  let params = useParams()
  const [state, setState] = useState({
    post: {},
    user: {},
  })

  useAsyncEffect(async () => {
    const post = await Http.get(`/posts/${params.postId}`)
    const user = await Http.get(`/users/${post.userId}`)
    setState({
      post,
      user,
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
      <Comment postId={state.post.id} />
    </>
  )
}
