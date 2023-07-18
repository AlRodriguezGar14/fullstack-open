const Blog = ({ blog }) => (
  <div>
    <p>
      "{blog.title}" by {blog.author}
    </p>
  </div>
);

export default Blog;
