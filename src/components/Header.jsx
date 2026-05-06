const Header = ({ user, logout }) => {
  return (
    <header className="app-header">
      <div>
        <h1 className="app-title">Blogs</h1>
        <p className="app-subtitle">Manage and discover posts</p>
      </div>

      <div className="header-user">
        <span>{user.name}</span>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
