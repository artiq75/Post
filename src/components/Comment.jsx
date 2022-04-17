import { useCallback, useState, memo, useMemo } from 'react'
import { Http } from '../utils/http'
import { useAsyncEffect } from '../hooks'

export function Comment({ postId }) {
  const [comments, setComments] = useState([])

  useAsyncEffect(async () => {
    if (postId) {
      const comments = await Http.get(`/posts/${postId}/comments`)
      setComments(comments)
    }
  }, [postId])

  const addComment = useCallback(
    async function (comment) {
      comment = await Http.post(`/comments`, {
        postId,
        ...comment,
      })
      setComments((comments) => [comment, ...comments])
    },
    [postId]
  )

  const removeComment = useCallback(
    async function (commentId) {
      await Http.delete(`/comments/${commentId}`)
      setComments((comments) =>
        comments.filter((comment) => comment.id !== commentId)
      )
    },
    [setComments]
  )

  const updateComment = useCallback(
    async function (newComment) {
      newComment = await Http.put(`/comments/${newComment.id}`, newComment)
      setComments((comments) =>
        comments.map((comment) => {
          if (comment.id !== newComment.id) {
            return comment
          }
          return newComment
        })
      )
    },
    [setComments]
  )

  return (
    <>
      <h2>Commentaires</h2>
      <CommentForm onSubmit={addComment} />
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem
              comment={comment}
              onRemove={removeComment}
              onUpdate={updateComment}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

const CommentItem = memo(function ({ comment, onRemove, onUpdate }) {
  const [isUpdate, setIsUpdate] = useState(false)

  const handleSubmit = useCallback(
    function (newComment) {
      onUpdate({ ...comment, ...newComment })
      setIsUpdate(false)
    },
    [comment, setIsUpdate]
  )

  const handleCancel = useCallback(
    function () {
      setIsUpdate(false)
    },
    [setIsUpdate]
  )

  const username = useMemo(
    function () {
      return comment.email.substring(0, comment.email.indexOf('@'))
    },
    [comment.email]
  )

  return (
    <>
      {!isUpdate && (
        <article>
          <p>
            <strong>{username}</strong>
            <br />
            {comment.body}
          </p>
          <button onClick={() => onRemove(comment.id)}>supprimer</button>
          <button onClick={() => setIsUpdate(true)}>modifier</button>
        </article>
      )}
      {isUpdate && (
        <CommentForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          comment={comment}
        />
      )}
    </>
  )
})

const CommentForm = memo(function ({ onSubmit, onCancel, comment }) {
  const handleSubmit = function (e) {
    e.preventDefault()
    const form = e.target
    const formData = {
      name: form.name.value,
      email: form.email.value,
      body: form.body.value,
    }
    const isEmpty = !Object.values(formData).some((value) => !!value)
    if (isEmpty) {
      return
    }
    onSubmit(formData)
    form.reset()
  }

  const handleCancel = function () {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Nom"
        defaultValue={comment?.name}
        required
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        defaultValue={comment?.email}
        required
      />
      <TextField
        textarea="true"
        name="body"
        label="Contenu"
        defaultValue={comment?.body}
        required
      />
      <button type="submit">{comment ? 'modifier' : 'Commenter'}</button>
      <button type="reset" onClick={handleCancel}>
        annuler
      </button>
    </form>
  )
})

function TextField(props) {
  const { type = 'text', name, label, textarea } = props
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea name={name} id={name} {...props} />
      ) : (
        <input type={type} name={name} id={name} {...props} />
      )}
    </div>
  )
}
