import Home from "../../../app/submit/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import { useRouter } from "next/navigation";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("New Thread page", () => {
  it("Displays new thread form", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));
    render(<Home />);

    const title = screen.getByTestId("new-title");
    const content = screen.getByTestId("new-content");
    const button = screen.getByRole("button", { name: "Submit" });

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
