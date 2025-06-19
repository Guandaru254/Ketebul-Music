// app/events/page.tsx
import "./events.css";

const events = [
  {
    title: "Ketebul Cultural Showcase",
    date: "2025-06-15",
    location: "Alliance Française, Nairobi",
    description:
      "A fusion of music, dance, and storytelling celebrating Kenya’s rich cultural heritage.",
  },
  {
    title: "Book Launch: The Rhythm of the Rift",
    date: "2025-07-05",
    location: "The GoDown Arts Centre",
    description:
      "A new book exploring the evolution of East African music, with live readings and performances.",
  },
  {
    title: "Sound of the Lake Festival",
    date: "2025-08-20",
    location: "Kisumu City Park",
    description:
      "A lakeside celebration of Luo traditions, with performances by local artists and food vendors.",
  },
];

export default function EventsPage() {
  return (
    <main className="events-page">
      <h1>Upcoming Events</h1>
      <div className="timeline">
        {events.map((event, idx) => (
          <div className="timeline-event" key={idx}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h2>{event.title}</h2>
              <p className="event-date">{event.date} | {event.location}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
