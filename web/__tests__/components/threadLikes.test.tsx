import { ThreadLikes } from "@/components/threadLikes";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Thread Likes", () => {
  it("Displays Thread Likes", () => {
    render(<ThreadLikes />);
    const like = screen.getByRole("img", { name: "like button" });
    const dislike = screen.getByRole("img", { name: "dislike button" });
    const count = screen.getByTestId("like-count");

    expect(like).toBeInTheDocument();
    expect(dislike).toBeInTheDocument();
    expect(count).toHaveTextContent("9999");
  });
});
