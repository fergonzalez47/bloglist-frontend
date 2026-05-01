import { useState } from 'react'

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const onUrlChange = (event) => {
    setUrl(event.target.value)
  }
  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type='text'
            value={title}
            name='Title'
            onChange={onTitleChange}
          />
        </div>
        <div>
          Author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={onAuthorChange}
          />
        </div>
        <div>
          Url <input type='url' value={url} name='Url' onChange={onUrlChange} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default CreateBlog
