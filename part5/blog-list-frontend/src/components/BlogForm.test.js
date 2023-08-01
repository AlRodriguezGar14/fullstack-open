import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

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

test("props properly received", () => {
  // Uncomment the comment marked in the BlogPost component to make this test work, as there's an issue related to the design of the app and the requirements for this test
  const createBlog = jest.fn();
  const { container } = render(<BlogForm createBlog={createBlog} />);

  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");
  const likes = container.querySelector("#likes");
  const form = container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Experimental" },
  });

  fireEvent.change(author, {
    target: { value: "El creador" },
  });

  fireEvent.change(url, {
    target: { value: "www.elcreador.es" },
  });
  fireEvent.change(likes, {
    target: { value: 100 },
  });
  fireEvent.submit(form);
  // screen.debug();
});
