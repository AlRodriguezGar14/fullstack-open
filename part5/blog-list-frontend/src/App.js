import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [readPassword, setReadPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const [newBlogVisibility, setNewBlogVisibility] = useState(false);

  const loginFormVisibility = {
    display: loginVisible ? "" : "none",
  };

  const logBtnVisiblity = {
    display: loginVisible ? "none" : "",
  };

  const [blogPost, setBlogPost] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

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

  useEffect(() => {
    blogService.getAll().then((fetched) => setBlogs(fetched));
  }, [blogs]);

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
        <LoginForm
          key={"uniqueLoginFormKey"}
          setLoginVisible={setLoginVisible}
          loginVisible={loginVisible}
          setNewBlogVisibility={setNewBlogVisibility}
          newBlogVisibility={newBlogVisibility}
          setReadPassword={readPassword}
          logBtnVisiblity={logBtnVisiblity}
          loginFormVisibility={loginFormVisibility}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          readPassword={readPassword}
        />
      ) : (
        <div>
          <div>
            <p>logged as {user.username}</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm
            key={"uniqueBlogFormID"}
            newBlogVisibility={newBlogVisibility}
            setNewBlogVisibility={setNewBlogVisibility}
            handleBlogSubmit={handleBlogSubmit}
            blogPost={blogPost}
            setBlogPost={setBlogPost}
          />
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
