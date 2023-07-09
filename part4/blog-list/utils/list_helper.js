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

const mostLikedAuthor = (blogs) => {
  // Group the likes per each author
  grouped = blogs.reduce((group, entry) => {
    const author = entry.author;
    group[author] = group[author] ?? [];
    group[author].push(entry.likes);
    return group;
  }, {});

  // Sum the likes to see which actor has more likes
  let authorsWithTotalLikes = [];
  const arrayOfLikesPerAuthor = 1;
  Object.entries(grouped).forEach((entry) => {
    entry[arrayOfLikesPerAuthor] = entry[arrayOfLikesPerAuthor].reduce(
      (acc, curr) => acc + curr
    );
    authorsWithTotalLikes.push(entry);
  });

  // Return the author with most likes
  let mostLiked = { autor: null, likes: 0 };
  const authorPostition = 0;
  const likesPosition = 1;
  for (let i = 0; i < authorsWithTotalLikes.length; i++) {
    const curr = authorsWithTotalLikes[i];

    curr[1] > mostLiked.likes
      ? (mostLiked = {
          author: curr[authorPostition],
          likes: curr[likesPosition],
        })
      : null;
  }
  return mostLiked;
};

//
module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostPosts,
  mostLikedAuthor,
};
