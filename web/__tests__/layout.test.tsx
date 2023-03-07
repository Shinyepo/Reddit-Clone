import { render } from "@testing-library/react";
import Layout from "../app/layout";
import "@testing-library/jest-dom";


describe("Layout", () => {
  it("Renders heading, searchbox and profile section", () => {
    const screen = render(<Layout children="" />);
    const heading = screen.getByRole("heading");
    const searchField = screen.getByRole("searchbox");
    const profileSection = screen.getByRole("menu");

    expect(heading).toHaveTextContent("Epodit");
    expect(searchField).toHaveTextContent("");
    expect(profileSection).toHaveTextContent("Profile section");
  });
});
