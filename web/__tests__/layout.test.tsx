import { render, screen } from '@testing-library/react'
import Layout from "../app/layout"
import '@testing-library/jest-dom'

const page = render(<Layout children="" />);

describe('Layout', () => {
  it('renders a heading', () => {

    const heading = screen.getByText("Epodit");
    const searchField = screen.getByPlaceholderText("Search threads...");
    const profileSection = screen.getByText("Profile section");

    const main = screen.getByRole("main")

    expect(heading).toBeInTheDocument()
    expect(searchField).toBeInTheDocument()
    expect(profileSection).toBeInTheDocument()
    expect(main).toBeInTheDocument()
  })
})