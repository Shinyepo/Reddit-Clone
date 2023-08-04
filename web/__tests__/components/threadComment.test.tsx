import React from "react";
import { ThreadComment } from "@/components/threadComment";
import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { comment, author, updatedComment } from "../../__mocks__/commentMock";

describe("Thread Comment", () => {
  it("Displays author with the avatar, content and footer", () => {
    render(<ThreadComment comment={comment} author={author} />);

    const commentAuthor = screen.getByTestId("comment-author");
    const avatar = screen.getByTestId("comment-avatar");
    const content = screen.getByTestId("comment-content");
    const footer = screen.getByTestId("comment-footer");
    const like = screen.getByRole("img", { name: "like button" });
    const dislike = screen.getByRole("img", { name: "dislike button" });
    const likesCounter = screen.getByTestId("likes-counter");

    expect(commentAuthor.textContent).toContain("Author Name");
    expect(avatar).toBeInTheDocument();
    expect(content.textContent).toEqual("some comment");
    expect(footer.textContent).toContain("REPLY" && "REPORT");
    expect(like).toBeInTheDocument();
    expect(dislike).toBeInTheDocument();
    expect(likesCounter.textContent).toEqual("-10");
  });
  it("Clicking like and dislike changes state's value", () => {
    render(<ThreadComment comment={comment} author={author} />);
    const like = screen.getByRole("img", { name: "like button" });
    const dislike = screen.getByRole("img", { name: "dislike button" });
    const count = screen.getByTestId("likes-counter");

    expect(count.textContent).toBe("-10");
    fireEvent.click(like);
    expect(count.textContent).toBe("-9");
    fireEvent.click(dislike);
    fireEvent.click(dislike);
    fireEvent.click(dislike);
    expect(count.textContent).toBe("-12");
  });
  it("UpdatedAt conditional text", () => {
    const { rerender } = render(
      <ThreadComment comment={comment} author={author} />
    );
    const commentAuthor = screen.getByTestId("comment-edited");

    expect(commentAuthor.textContent).not.toContain("- edited");
    rerender(<ThreadComment comment={updatedComment} author={author} />);
    const updatedCommentAuthor = screen.getByTestId("comment-edited");

    expect(updatedCommentAuthor.textContent).toContain("- edited");
  });
});
