const LoginForm = ({
  handleLogin,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        <label>username</label>
        <input type="text" value={username} onChange={onUsernameChange} />
      </div>

      <div>
        <label>password</label>
        <input type="password" value={password} onChange={onPasswordChange} />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
