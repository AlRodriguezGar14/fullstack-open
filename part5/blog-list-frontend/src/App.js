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
  const [message, setMessage] = useState(null);

  const [blogPost, setBlogPost] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

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
        <input
          type="text"
          value={blogPost["title"]}
          onChange={(event) =>
            setBlogPost({ ...blogPost, title: event.target.value })
          }
        />
        author
        <input
          type="text"
          value={blogPost["author"]}
          onChange={(event) =>
            setBlogPost({ ...blogPost, author: event.target.value })
          }
        />
        url
        <input
          type="text"
          value={blogPost["url"]}
          onChange={(event) =>
            setBlogPost({ ...blogPost, url: event.target.value })
          }
        />
        likes
        <input
          type="number"
          value={blogPost["likes"]}
          onChange={(event) =>
            setBlogPost({ ...blogPost, likes: event.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );

  const toggleReadPassword = (event) => {
    event.preventDefault();
    setReadPassword(!readPassword);
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    console.log(blogPost);
    try {
      const response = await blogService.create(blogPost);
      setBlogs(blogs.concat(response));
      setMessage(`new blog created: ${blogPost.title} by ${blogPost.author}`);
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage("Your blog was not published. Something went wrong");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(usr));
      blogService.setToken(usr.token);
      setUser(usr);
      // console.log(usr);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password");
      setUser(null);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    blogService.setToken("");
    window.localStorage.removeItem("loggedBlogappUser");
  };
  const passwordFormType = readPassword === false ? "password" : "text";

  useEffect(() => {
    blogService.getAll().then((fetched) => setBlogs(fetched));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {message !== null ? (
        <p style={{ padding: "20px", backgroundColor: "grey" }}>{message}</p>
      ) : null}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>logged as {user.username}</p>
          <button onClick={handleLogout}>logout</button>
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
