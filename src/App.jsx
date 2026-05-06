import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import Header from "./components/Header";

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className={`${message.type}`}>{message.text}</div>
}

// const Logout = ({ logout }) => {
//   return (
//     <>
//       <button onClick={logout}>Logout</button>
//     </>
//   )
// }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  //Para condicionar renderizado de formuarrio de login
  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs([...blogs].sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      //guardando el token en localstorage aqui
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      // setLoginVisible(false)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //obtengo eel tipo de error desde el backend middleware.js
      const error = exception.response?.data?.error

      let messageText = 'Something went wrong'

      if (error === 'invalid username or password') {
        messageText = 'Wrong credentials'
      } else if (error === 'token expired') {
        messageText = 'Session expired, please login again'
      } else if (error === 'token invalid') {
        messageText = 'Invalid session'
      } else if (error === 'Token missing') {
        messageText = 'You must be logged in'
      }

      setMessage({
        text: messageText,
        type: 'error',
      })

      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))

      setMessage({
        text: `Added  ${returnedBlog.title}`,
        type: 'success',
      })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        text: `Error creating blog. - ${error}`,
        type: 'error',
      })

      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleUpdateBlogLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }
      const returned = await blogService.updateBlog(blog.id, updatedBlog)

      setBlogs((prev) => {
        const updatedBlogs = prev.map((b) => (b.id === blog.id ? returned : b))

        return updatedBlogs.sort((a, b) => b.likes - a.likes)
      })
    } catch (error) {
      console.log(error)
      setMessage({
        text: `Error updating blog. - ${error}`,
        type: 'error',
      })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      const confirmed = window.confirm(`Do you want to delete ${blog.title}?`)
      if (!confirmed) {
        return
      }

      //debido a que delete ne el backend no me retorna nada, lo hago directo sin
      //almacenarlo en ninguna variable
      await blogService.deleteBlog(blog.id)

      //uso prev en lugar de blogs para evitar problemas de usar una variable vieja del estate blogs
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id))

      setMessage({
        text: 'Blog deleted successfully',
        type: 'success',
      })

      setTimeout(() => setMessage(null), 3000)

    } catch (error) {
      console.log(error)
      setMessage({
        text: error.response?.data?.error || 'Error deleting blog',
        type: 'error',
      })

      setTimeout(() => setMessage(null), 5000)
    }
  }
return (
  <div>
    {user === null ? (
      <>
        <Notification message={message} />

        <div className="login-section">
          <h1 className="app-title">Blogs</h1>
          <p className="app-subtitle">Sign in to continue</p>

          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              onUsernameChange={handleUsernameChange}
              onPasswordChange={handlePasswordChange}
            />
          </Togglable>
        </div>
      </>
    ) : (
      <>
        <Header user={user} logout={handleLogout} />

        <Notification message={message} />

        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <CreateBlog handleCreateBlog={handleCreateBlog} />
        </Togglable>

        <div className="blog-list">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={handleUpdateBlogLike}
              deleteBlog={handleDeleteBlog}
              loggedUserId={user.id}
            />
          ))}
        </div>
      </>
    )}
  </div>
);
}

export default App
