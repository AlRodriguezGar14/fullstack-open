import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react testing library",
  author: "test library",
  url: "www.test.es",
  likes: 100,
  user: {
    username: "mr tests",
    name: "el testeador",
    passwordHash: "fhsajkflhsfkljshflaksfhjsaklf",
  },
};

test("renders the default content", () => {
  const { container } = render(<Blog blog={blog} />);
  const hiddenSection = container.querySelector(".toggable");
  expect(container).toHaveTextContent(blog.title);
  expect(container).toHaveTextContent(blog.author);
  expect(hiddenSection).toHaveStyle("display: none");
});

// test("when clicking, renders the whole content", async () => {
//   let container = render(<Blog blog={blog} handleBlogLikes={mockHandler} />);
//   const user = userEvent.setup();
//   const button = screen.getByText("show more");
//   await user.click(button);
//   // expect(container).toHaveTextContent(blog.likes);
//   screen.debug();
// });
//
