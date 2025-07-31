import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useState } from "react";
import SingleBook from "../components/SingleBook";
import books from "../data/fantasy.json";

// Componente wrapper che simula il comportamento del padre
function TestWrapper() {
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);
  const book = books[0];

  return (
    <SingleBook
      book={book}
      onSelect={setSelectedBookAsin}
      isSelected={selectedBookAsin === book.asin}
    />
  );
}

describe("Verifica che il bordo del libro diventi rosso al click", () => {
  it("cambia il bordo in rosso quando il libro viene cliccato", () => {
    render(<TestWrapper />);

    const bookCard = screen.getByTestId("book-card");

    expect(bookCard).toHaveStyle("border: 1px solid #ddd");

    fireEvent.click(bookCard);

    expect(bookCard).toHaveStyle("border: 3px solid red");
  });
});
