const dummy = (blogs) => {
  return 1;
};

// const totalLikes = (blogs) => {
//   totals = 0;
//   for (let i = 0; i < blogs.length; i++) {
//     totals += blogs[i].likes;
//   }
//   return totals;
// };
//
// Same functionality as the previous for loop. This is more idiomatic, but i preffer the loop far more
const totalLikes = (blogs) => {
  totals = blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  return totals;
};

const favBlog = (blogs) => {
  if (blogs.length === 0) return {};
  favBlogIndex = 0;
  mostLiked = 0;
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLiked) {
      mostLiked = blogs[i].likes;
      favBlogIndex = i;
    }
  }
  return {
    title: blogs[favBlogIndex].title,
    author: blogs[favBlogIndex].author,
    likes: blogs[favBlogIndex].likes,
  };
};

const mostPosts = (blogs) => {
  grouped = blogs.reduce((group, entry) => {
    const category = entry.author;
    group[category] = group[category] ?? [];
    group[category].push(entry.author);
    return group;
  }, {});
  return getMostPostsAutor(grouped);
};

const getMostPostsAutor = (groupedList) => {
  let mostPostsAutor = { author: "", blogs: 0 };
  Object.entries(groupedList).forEach(([key, value]) => {
    value.length > mostPostsAutor.blogs
      ? ((mostPostsAutor.author = key), (mostPostsAutor.blogs = value.length))
      : null;
  });
  return mostPostsAutor;
};

//
module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostPosts,
};
