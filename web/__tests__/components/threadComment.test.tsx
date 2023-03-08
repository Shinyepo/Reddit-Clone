import { ThreadComment } from "@/components/threadComment";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Thread Comment", () => {
  it("Displays author with the avatar, content and footer", () => {
    render(<ThreadComment />);

    const author = screen.getByTestId("comment-author");
    const avatar = screen.getByTestId("comment-avatar");
    const content = screen.getByTestId("comment-content");
    const footer = screen.getByTestId("comment-footer");
    const like = screen.getByRole("img", { name: "like button" });
    const dislike = screen.getByRole("img", { name: "dislike button" });

    expect(author.textContent?.length).toBeGreaterThan(0);
    expect(avatar).toBeInTheDocument();
    expect(content.textContent?.length).toBeGreaterThan(0);
    expect(footer.textContent).toContain("REPLY" && "REPORT");
    expect(like).toBeInTheDocument();
    expect(dislike).toBeInTheDocument();
  });
  it("Clicking like and dislike changes state's value", () => {
    render(<ThreadComment />);
    const like = screen.getByRole("img", { name: "like button" });
    const dislike = screen.getByRole("img", { name: "dislike button" });
    const count = screen.getByTestId("comment-likes");

    expect(count.textContent).toBe("0");
    fireEvent.click(like);
    expect(count.textContent).toBe("1");
    fireEvent.click(dislike);
    fireEvent.click(dislike);
    fireEvent.click(dislike);
    expect(count.textContent).toBe("-2");
  });
});
