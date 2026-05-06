import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "React Testing",
    author: "Fernando",
    url: "www.fernandi.com",
    likes: 5,
    user: {
      id: "123",
      name: "Fernando",
    },
  };


  render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      deleteBlog={() => {}}
      loggedUserId="123"
    />,
  );

  expect(screen.getByText("React Testing")).toBeDefined();
  expect(screen.getByText("Fernando")).toBeDefined();

  //para ocultar
  expect(screen.queryByText("www.fernandi.com")).toBeNull();
  expect(screen.queryByText(/likes:/i)).toBeNull();
});

// 5.14
test("Show URl and likes when View Details is clicked", async () => {
  const blog = {
    title: "React Testing",
    author: "Fernando",
    url: "www.fernandi.com",
    likes: 5,
    user: {
      id: "123",
      name: "Fernando",
    },
  };

  render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      deleteBlog={() => {}}
      loggedUserId="123"
    />,
  );

  const user = userEvent.setup();

  const btn = screen.getByText("View details");
  await user.click(btn);

  expect(screen.getByText("www.fernandi.com")).toBeDefined();
  expect(screen.getByText("Likes: 5")).toBeDefined();
});



test("Click two times in the UpdateLikes should work", async ()=> {
  const blog = {
    title: "React Testing",
    author: "Fernando",
    url: "www.fernandi.com",
    likes: 5,
    user: {
      id: "123",
      name: "Fernando",
    },
  };

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      updateLikes={mockHandler}
      deleteBlog={() => {}}
      loggedUserId="123"
    />,
  );

  const user = userEvent.setup();
  const btn = screen.getByText("View details");
  await user.click(btn);
  
  const btnUpdate = screen.getByText("Like");
  await user.click(btnUpdate);
  await user.click(btnUpdate);

  expect(mockHandler.mock.calls).toHaveLength(2);
  // expect(screen.getByText("Likes: 7")).toBeDefined();
})



test("tests that forms call controller ", async () => {
  
})