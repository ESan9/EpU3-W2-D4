import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookList from "../components/BookList";
import books from "../data/fantasy.json";
import userEvent from "@testing-library/user-event";

// <!-- 2. Verifica che vengano effettivamente renderizzate tante bootstrap cards quanti sono i libri nel file json utilizzato.  -->
// <!-- 4. Verifica, magari con più tests, che il filtraggio dei libri tramite navbar si comporti come previsto.  -->

describe("BookList - rendering corretto delle card", () => {
  it("renderizza tante card quanti sono i libri nel JSON", () => {
    render(<BookList books={books} />);

    const renderedCards = screen.getAllByTestId("book-card");
    expect(renderedCards).toHaveLength(books.length);
  });
});

it("filtra i libri in base alla ricerca inserita", async () => {
  render(<BookList books={books} />);
  const input = screen.getByTestId("search-input");

  // Sceglie un titolo a caso dal JSON
  const testBook = books.find((b) => b.title && b.title.length > 0);
  expect(testBook).toBeTruthy(); // il JSON non è vuoto

  // Prende una parola chiave dal titolo (la prima parola utile)
  const keyword = testBook.title.split(" ")[0].toLowerCase();

  // Simula digitazione
  await userEvent.clear(input);
  await userEvent.type(input, keyword);

  // Filtra i libri manualmente
  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(keyword)
  );

  // Controlla quante card sono visibili
  const cards = screen.queryAllByTestId("book-card");
  expect(cards.length).toBe(filteredBooks.length);

  // Verifica che almeno uno dei libri filtrati sia presente
  if (filteredBooks.length > 0) {
    expect(
      screen.getByText(new RegExp(filteredBooks[0].title, "i"))
    ).toBeInTheDocument();
  }
});
