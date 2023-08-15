describe("Blogs app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "user1234",
      name: "someone",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("blogs");
    // there are no blogs as the page is empty due to using reset
    // cy.contains("blog created with user token2");
  });

  it("login fails with wrong credentials", function () {
    cy.contains("Log In").click();
    cy.get("#usernameInput").type("wrong user");
    cy.get("#passwordInput").type("1111111");
    cy.get("#submitLogin").click();
    cy.contains("Wrong username or password");
  });
  it("login form can be opened and the user can login", function () {
    cy.contains("Log In").click();
    cy.get("#usernameInput").type("user1234");
    cy.get("#passwordInput").type("1234");
    cy.get("#submitLogin").click();
    cy.contains("logged as user1234");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Log In").click();
      cy.get("#usernameInput").type("user1234");
      cy.get("#passwordInput").type("1234");
      cy.get("#submitLogin").click();
      cy.contains("logged as user1234");
    });
    it("a new note can be created", function () {
      cy.get("#displayBlogForm").click();
      cy.get("#title").type("title from test");
      cy.get("#author").type("author from test");
      cy.get("#url").type("url from test");
      cy.get("#likes").type(1000);
      cy.get("#submitBlog").click();
      cy.contains("new blog created: title from test by author from test");
    });
    describe("when a blog exists", function () {
      beforeEach(function () {
        const blog = {
          title: "title from test",
          author: "author from test",
          url: "https://testing.com",
          likes: 103,
        };
        cy.get("#displayBlogForm").click();
        cy.get("#title").type(blog.title);
        cy.get("#author").type(blog.author);
        cy.get("#url").type(blog.url);
        cy.get("#likes").type(blog.likes);
        cy.get("#submitBlog").click();
        cy.contains("author from test");
      });
      it("user can like the blog", function () {
        cy.get("#showContent").click();
        cy.get("#likeButton").click();
        cy.contains(104);
      });
      it("user can delete the blog", function () {
        cy.get("#showContent").click();
        cy.get("#deletePost").click();
      });
      it("only the user who created the blog can delete it", function () {
        cy.get("#logoutButton").click();
        cy.get("#showContent").click();
        cy.get("#deletePost").should("not.exist");
      });
    });
  });
});
