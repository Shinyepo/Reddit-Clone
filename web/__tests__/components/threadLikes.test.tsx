import { ThreadLikes } from "@/components/threadLikes";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Thread Likes", () => {
  it("Displays Thread Likes", () => {
    render(<ThreadLikes />);
    const like = screen.getByRole("img", { name: "like button" });
    const dislike = screen.getByRole("img", { name: "dislike button" });
    const count = screen.getByTestId("like-count");

    expect(like).toBeInTheDocument();
    expect(dislike).toBeInTheDocument();
    expect(count.textContent).toBe("0");

    fireEvent.click(like);
    expect(count.textContent).toBe("1");
    fireEvent.click(dislike);
    fireEvent.click(dislike);
    expect(count.textContent).toBe("-1");
  });
});
