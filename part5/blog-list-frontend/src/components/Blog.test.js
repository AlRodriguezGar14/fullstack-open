import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react testing library",
  author: "test library",
  url: "www.test.es",
  user: {
    username: "mr tests",
    name: "el testeador",
    passwordHash: "fhsajkflhsfkljshflaksfhjsaklf",
  },
};
const mockHandler = jest.fn();

test("renders content", () => {
  const { container } = render(
    <Blog blog={blog} handleBlogLikes={mockHandler} />
  );

  expect(container).toHaveTextContent(blog.title);
  expect(container).toHaveTextContent(
    "test libraryshow morewww.test.esLikemr tests"
  );
  expect(container).toHaveTextContent(
    "test libraryshow morewww.test.esLikemr tests"
  );
});

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: "Component testing is done with react testing library",
    author: "test library",
    url: "www.test.es",
    user: {
      username: "mr tests",
      name: "el testeador",
      passwordHash: "fhsajkflhsfkljshflaksfhjsaklf",
    },
  };
  const mockHandler = jest.fn();
  render(<Blog blog={blog} handleBlogLikes={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("Like");
  await user.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
