'use client';

import './contact.css';

export default function ContactPage() {
  return (
    <main className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-content">
        <div className="contact-info">
          <p><strong>Email:</strong> info@ketebulmusic.org</p>
          <p><strong>Tel:</strong> (+254) 20 675 1011</p>
          <p><strong>Address:</strong> Ketebul Music Studios, GoDown Arts Centre, Nairobi, Kenya</p>


          <div className="map-container">
            <iframe
              title="Ketebul Music Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.056283804603!2d36.8380003!3d-1.3065047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10f169f1524f%3A0x2d4b3271c9f41342!2sThe%20GoDown%20Arts%20Centre!5e0!3m2!1sen!2ske!4v1718791456340!5m2!1sen!2ske"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
