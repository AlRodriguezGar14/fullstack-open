const LoginForm = ({
  setLoginVisible,
  loginVisible,
  setReadPassword,
  logBtnVisiblity,
  loginFormVisibility,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  readPassword,
}) => {
  const passwordFormType = readPassword === false ? "password" : "text";

  const toggleLoginVisibility = (e) => {
    e.preventDefault();
    setLoginVisible(!loginVisible);
  };

  const toggleReadPassword = (event) => {
    event.preventDefault();
    setReadPassword(!readPassword);
  };
  return (
    <>
      <button
        type="submit"
        onClick={toggleLoginVisibility}
        style={logBtnVisiblity}
      >
        Log In
      </button>
      <div className="form" style={loginFormVisibility}>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="usernameInput"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="passwordInput"
              type={passwordFormType}
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="submitLogin" type="submit">
            Login
          </button>
          <button type="submit" onClick={toggleLoginVisibility}>
            Cancel
          </button>
          <button
            type="submit"
            onClick={toggleReadPassword}
            style={{ margin: "10px" }}
          >
            Show / Hide the password
          </button>
        </form>
      </div>
    </>
  );
};

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   handleLogin: PropTypes.func.isRequired,
// };

export default LoginForm;
