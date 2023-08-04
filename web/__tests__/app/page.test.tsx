import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../../app/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { PostResponse } from "../../__mocks__/app/page.mock";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("Renders sidebar with about section", async () => {
    await (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => PostResponse),
    });
    render(<Home />);
    await waitFor(() => {
      const sidebar = screen.getByTestId("sidebar");
      const about = screen.getByTestId("about");
      const heading = screen.getByRole("heading", { name: /header/i });

      expect(sidebar).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(heading).toHaveTextContent("A header for about section");
    });
  });
  it("Renders thread preview components", async () => {
    await (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => PostResponse),
    });
    render(<Home />);
    await waitFor(() => {
      const comp = screen.getByRole("article");
      expect(comp.childElementCount).toBeGreaterThan(0);
    });
  });
  it("Displays new thread container with redirect functionality", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));
    await (fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn(() => PostResponse),
    });

    render(<Home />);
    await waitFor(() => {
      const avatar = screen.getByTestId("new-avatar");
      const link = screen.getByTestId("input-redirect");

      link.click();
      expect(push).toHaveBeenCalledWith("/submit");
      expect(avatar).toBeInTheDocument();
    });
  });
});
