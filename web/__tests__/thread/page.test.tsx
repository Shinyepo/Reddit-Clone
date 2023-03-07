import Home from "../../app/thread/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Thread Page", () => {
  it("Displays main thread conatiner with author, title and content", () => {
    render(<Home />);
    const author = screen.getByTestId("thread-author");
    const title = screen.getByTestId("thread-title");
    const content = screen.getByTestId("thread-content");

    expect(author.textContent?.length).toBeGreaterThan(0);
    expect(title.textContent?.length).toBeGreaterThan(0);
    expect(content.textContent?.length).toBeGreaterThan(0);
  });
  it("Displays New Comment section with textarea and button", () => {
    render(<Home />);
    const section = screen.getByTestId("new-comment-field");
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Comment" });

    expect(section.firstChild?.textContent).toBe("Write a new comment");
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
