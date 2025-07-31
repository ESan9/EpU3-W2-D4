import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CommentArea from "../components/CommentArea";

describe("CommentArea", () => {
  it("viene renderizzato correttamente con un asin valido", () => {
    render(<CommentArea asin="1234567890" />);

    // Verifica la presenza del campo input per la recensione
    const input = screen.getByPlaceholderText(/inserisci/i);
    expect(input).toBeInTheDocument();

    // Verifica la presenza della select per la valutazione
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Verifica la presenza del pulsante Invia
    const button = screen.getByRole("button", { name: /invia/i });
    expect(button).toBeInTheDocument();
  });
});
