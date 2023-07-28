import { useState } from "react";

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);
  const showHide = { display: showBlog ? "" : "none" };

  return (
    <div
      style={{
        boxShadow: "0 0 3px 2px black",
        padding: "5px 15px",
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
        <p>{blog.user.username}</p>
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
