import Home from "../../app/submit/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

describe("New Thread page", () => {
  it("Displays new thread form", () => {
    render(<Home />);

    const title = screen.getByTestId("new-title");
    const content = screen.getByTestId("new-content");
    const button = screen.getByRole("button", { name: "Submit" });

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
