// app/contact/page.tsx
import "./contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-content">
        <div className="contact-info">
          <p><strong>Email:</strong> info@ketebulmusic.org</p>
          <p><strong>Phone:</strong> +254 700 000 000</p>
          <p><strong>Address:</strong> Ketebul Music Studios, GoDown Arts Centre, Nairobi, Kenya</p>

          <div className="socials">
            <a href="#" target="_blank">Instagram</a>
            <a href="#" target="_blank">Facebook</a>
            <a href="#" target="_blank">YouTube</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows={5} required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </main>
  );
}
