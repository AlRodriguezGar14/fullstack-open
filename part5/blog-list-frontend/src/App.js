import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [readPassword, setReadPassword] = useState(false);

  const toggleReadPassword = (event) => {
    event.preventDefault();
    setReadPassword(!readPassword);
  };

  const passwordFormType = readPassword === false ? "password" : "text";

  useEffect(() => {
    blogService.getAll().then((fetched) => setBlogs(fetched));
  }, []);

  return (
    <div>
      <h2>login</h2>
      <form>
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
        <button onClick={toggleReadPassword} style={{ margin: "10px" }}>
          Show / Hide the password
        </button>
      </form>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
