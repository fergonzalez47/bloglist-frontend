import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, loggedUserId }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div className='blog-top'>
        <div className='blog-info'>
          <span className='blog-title'>{blog.title}</span>
          <span className='blog-author'>{blog.author}</span>
        </div>

        <button className='btn-toggle' onClick={toggleVisibility}>
          {visible ? 'Hide details' : 'View details'}
        </button>
      </div>

      {visible && (
        <div className='blog-details'>
          <div className='blog-meta'>
            <p>{blog.url}</p>
            <p>{blog.user.name}</p>
          </div>

          <div className='blog-actions'>
            <div className='likes-section'>
              <p>likes: {blog.likes}</p>
              <button onClick={() => updateLikes(blog)}>Like</button>
            </div>

            {blog.user.id === loggedUserId && (
              <button className='btn-delete' onClick={() => deleteBlog(blog)}>
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
