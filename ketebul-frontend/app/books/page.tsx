// app/books/page.tsx
import "./books.css";

const books = [
  {
    title: "Shades of Benga",
    cover: "/books/shades-of-benga.jpg",
    description: "A definitive history of Kenya’s Benga music scene with rare photographs and interviews.",
  },
  {
    title: "Voices from the Coast",
    cover: "/books/voices-from-the-coast.jpg",
    description: "Stories and songs from Kenya’s coastal communities, capturing rich Swahili culture.",
  },
  {
    title: "The Rift Rhythms",
    cover: "/books/rift-rhythms.jpg",
    description: "Tracing the musical heartbeat of the Rift Valley and its influence on modern sounds.",
  },
];

export default function BooksPage() {
  return (
    <main className="books-page">
      <h1>Books by Ketebul</h1>
      <div className="book-grid">
        {books.map((book, idx) => (
          <div className="book-card" key={idx}>
            <img src={book.cover} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
