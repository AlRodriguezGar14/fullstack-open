const BlogForm = ({
  newBlogVisibility,
  handleBlogSubmit,
  setNewBlogVisibility,
  blogPost,
  setBlogPost,
}) => {
  const toggleNewBlogVisibility = (e) => {
    e.preventDefault();
    setNewBlogVisibility(!newBlogVisibility);
    console.log(newBlogVisibility);
  };

  const newBlogVisible = { display: newBlogVisibility ? "" : "none" };
  const newBlogBtnVisible = { display: newBlogVisibility ? "none" : "" };

  return (
    <>
      <button
        type="submit"
        onClick={toggleNewBlogVisibility}
        style={newBlogBtnVisible}
      >
        New Blog
      </button>
      <div className="NewBlogForm" style={newBlogVisible}>
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
          <button type="submit" onClick={toggleNewBlogVisibility}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
