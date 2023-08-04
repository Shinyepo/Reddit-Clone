import Home from "../../../../app/thread/[slug]/page";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
const params = { slug: "1" };

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));


describe("Thread Page", () => {
  it("Displays main thread conatiner with author, title and content", async () => {
    render(<Home params={params} />);
    await waitFor(() => {
      const author = screen.getByTestId("thread-author");
      const title = screen.getByTestId("thread-title");
      const content = screen.getByTestId("thread-content");

      expect(author.textContent?.length).toBeGreaterThan(0);
      expect(title.textContent?.length).toBeGreaterThan(0);
      expect(content.textContent?.length).toBeGreaterThan(0);
    });
  });
  it("Displays New Comment section with textarea and button", async () => {
    render(<Home params={params} />);
    await waitFor(() => {
      const section = screen.getByTestId("new-comment-field");
      const textarea = screen.getByRole("textbox");
      const button = screen.getByRole("button", { name: "Comment" });

      expect(section.firstChild?.textContent).toBe("Write a new comment");
      expect(textarea).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });
  it("Displays comment section with comments", async () => {
    render(<Home params={params} />);
    await waitFor(() => {
      const section = screen.getByTestId("comment-section");

      expect(section.childElementCount).toBeGreaterThan(0);
    });
  });
});
