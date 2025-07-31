import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Welcome from "../components/Welcome";

// 1. Verifica che il componente Welcome venga montato correttamente.

describe("Testing initial mounting", () => {
  it("checks if component title is in the DOM", () => {
    render(<Welcome />);
    const title = screen.getByText(/benvenuti in epibooks!/i);
    expect(title).toBeInTheDocument();
  });
});
