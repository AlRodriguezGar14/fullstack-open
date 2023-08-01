describe("Blogs app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    // cy.contains("blogs");
    // cy.contains("blog created with user token2");
  });
});

