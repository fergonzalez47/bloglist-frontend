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
        <input
          data-testid="username"
          type="text"
          value={username}
          onChange={onUsernameChange}
          placeholder="Username"
        />
      </div>

      <div>
        <label>password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          data-testid="password"
        />
      </div>

      <button data-testid="Login-btn" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm
