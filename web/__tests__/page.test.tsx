import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home", () => {
  it("Renders sidebar with about section", () => {
    render(<Home />);

    const sidebar = screen.getByTestId("sidebar");
    const about = screen.getByTestId("about");
    const heading = screen.getByRole("heading", { name: /header/i });

    expect(sidebar).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(heading).toHaveTextContent("A header for about section");
  });
  it("Renders thread preview components", () => {
    render(<Home />);

    const comp = screen.getByRole("article");
    expect(comp.childElementCount).toBeGreaterThan(0);
  });
  it("Displays new thread container with redirect functionality", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));
    render(<Home />);

    const avatar = screen.getByTestId("new-avatar");
    const link = screen.getByTestId("input-redirect");

    link.click();
    expect(push).toHaveBeenCalledWith("/submit");
    expect(avatar).toBeInTheDocument();
  });
});
