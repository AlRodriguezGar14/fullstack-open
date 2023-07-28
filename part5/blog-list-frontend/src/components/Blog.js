import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, handleBlogLikes, handleRemoveBlog, loggedUser }) => {
  const [showBlog, setShowBlog] = useState(false);
  const showHide = { display: showBlog ? "" : "none" };

  return (
    <div
      style={{
        boxShadow: "0 0 3px 2px black",
        padding: "15px 20px",
        marginBottom: "10px",
      }}
    >
      <section>
        <p>
          "{blog.title}" by {blog.author}
        </p>
        <BlogShowBtn
          key={"showBlogUniqueBtn"}
          showBlog={showBlog}
          setShowBlog={setShowBlog}
          blog={blog}
        />
      </section>
      <section style={showHide}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <button onClick={(event) => handleBlogLikes(event, blog)}>Like</button>
        <p>{blog.user.username}</p>
        {loggedUser === blog.user.username ? (
          <button onClick={(event) => handleRemoveBlog(event, blog)}>
            Delete this post
          </button>
        ) : null}
      </section>
    </div>
  );
};

const BlogShowBtn = ({ showBlog, setShowBlog, blog }) => {
  const content = showBlog ? "hide" : "show more";

  const handleBlogShow = (e) => {
    e.preventDefault();
    setShowBlog(!showBlog);
  };

  return <button onClick={handleBlogShow}>{content}</button>;
};

export default Blog;
