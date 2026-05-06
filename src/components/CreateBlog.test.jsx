import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("CreateBlog calls the controller", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog handleCreateBlog={mockHandler} />);

  const inputs = screen.getAllByRole("textbox");

  await user.type(inputs[0], "testing component");
  await user.type(inputs[1], "Fernando Gonzalez");
  await user.type(inputs[2], "www.fernandog.com");

  const form = screen.getByText("Create").closest("form");
  fireEvent.submit(form);

  expect(mockHandler).toHaveBeenCalledTimes(1);

  expect(mockHandler).toHaveBeenCalledWith({
    title: "testing component",
    author: "Fernando Gonzalez",
    url: "www.fernandog.com",
  });
});
