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
            id="inputTitle"
            type="text"
            value={title}
            name="Title"
            onChange={onTitleChange}
            placeholder="Blog..."
          />
        </div>
        <div>
          Author
          <input
            id="inputAuthor"
            type="text"
            value={author}
            name="Author"
            onChange={onAuthorChange}
            placeholder="Author..."
          />
        </div>
        <div>
          Url{" "}
          <input
            id="inputUrl"
            type="url"
            value={url}
            name="Url"
            onChange={onUrlChange}
            placeholder="http://example.com/"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateBlog
