import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [readPassword, setReadPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const loginForm = () => (
    <>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type={passwordFormType}
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={toggleReadPassword} style={{ margin: "10px" }}>
          Show / Hide the password
        </button>
      </form>
    </>
  );

  const blogForm = () => (
    <>
      <h2>Add a blog</h2>
      <form onSubmit={handleBlogSubmit}>
        title
        <input type="text" value="title" />
        author
        <input type="text" value="author" />
        url
        <input type="text" value="url" />
        likes
        <input type="number" value="0" />
        <button type="submit">Submit</button>
      </form>
    </>
  );

  const toggleReadPassword = (event) => {
    event.preventDefault();
    setReadPassword(!readPassword);
  };

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    console.log("sumitting blog...");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({ username, password });
      setUser(usr);
      console.log(usr);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setUser(null);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const passwordFormType = readPassword === false ? "password" : "text";

  useEffect(() => {
    blogService.getAll().then((fetched) => setBlogs(fetched));
  }, []);

  return (
    <div>
      {errorMessage !== null ? <p>{errorMessage}</p> : null}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>logged as {user.username}</p>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
