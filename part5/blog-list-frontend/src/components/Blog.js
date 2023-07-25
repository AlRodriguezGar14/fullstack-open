const Blog = ({ blog }) => (
  <div
    style={{
      boxShadow: "0 0 3px 2px black",
      padding: "2px",
      marginTop: "10px",
      marginBottom: "10px",
    }}
  >
    <p>
      "{blog.title}" by {blog.author}
    </p>
  </div>
);

export default Blog;
