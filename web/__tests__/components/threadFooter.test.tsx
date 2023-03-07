import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThreadFooter } from "@/components/threadFooter";

describe("Thread Footer", () => {
  it("Display Thread Footer comment, share and favourite buttons", () => {
    render(<ThreadFooter />);
    const comment = screen.getByRole("img", { name: "comment" });
    const favourite = screen.getByRole("img", { name: "favourite" });
    const share = screen.getByRole("img", { name: "share" });
    const footer = screen.getByTestId("thread-footer");

    expect(comment).toBeInTheDocument();
    expect(favourite).toBeInTheDocument();
    expect(share).toBeInTheDocument();
    expect(footer.textContent).toContain("Comment" && "Share" && "Favourite");
  });
});
