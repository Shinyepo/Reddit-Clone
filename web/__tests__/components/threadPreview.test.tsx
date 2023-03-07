import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThreadPreview } from "@/components/threadPreview";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Thread Preview", () => {
  it("Displays Thread Likes and Footer", () => {
    render(<ThreadPreview />);
    const likes = screen.getByTestId("thread-likes");
    const footer = screen.getByTestId("thread-footer");

    expect(likes).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
  it("Displays author, title and content of the thread in a sliced version", () => {
    render(<ThreadPreview />);

    const author = screen.getByTestId("thread-author");
    const title = screen.getByTestId("thread-title");
    const content = screen.getByTestId("thread-content");

    expect(author.textContent?.length).toBeGreaterThan(0)
    expect(title.textContent?.length).toBeGreaterThan(0)
    expect(content.textContent?.length).toBeGreaterThan(0)
  })
  it("Clicking on the main div redirects to the thread", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));
    render(<ThreadPreview />);

    const clickable = screen.getByRole("link");

    clickable.click();

    expect(push).toHaveBeenCalledWith("/thread");
  });
});
