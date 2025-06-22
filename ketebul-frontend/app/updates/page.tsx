import './updates.css';

const updates = [
  {
    date: '23 Sep 2020',
    title: 'Shades of Benga Online – Episode 2: The Congo Connection & Nairobi Social Halls',
    content: `We’re back again this Wednesday 23 September @ 8:00PM EAT (+3GMT) with #shadesofbenga online episode 2. We travel back in time and see how a couple of Congolese guitarists influenced Kenyan popular music in the 1950s. Join us on our YouTube channel KETEBULMUSIC and Facebook page ketebulmusic to watch this episode. CLICK HERE to schedule and to view the episode.`,
    link: 'https://www.youtube.com/@ketebulmusic',
    image: '/updates/up.png',
  },
  {
    date: '26 Apr 2020',
    title: 'Tabu Osusa: The Making of an International Music Champion',
    content: `By Isaac Otidi Amuke

Osusa and I are sitting at La Belle Époque, the ground floor café at Nairobi’s Alliance Francaise on Monrovia Street. Soon, our conversation becomes untenable when music from Straight Line Connection, a Nairobi indie rock/metal band gets too loud. Osusa, an avid French speaker and board member at Nairobi’s Alliance Francaise, informs me that the performance is part of ShowCase Wednesday, a monthly shindig where artists experiment with an eye on building audiences. That’s how Osusa and I, once again, make for the relatively quieter Sippers pub in Hurlingham, a hideaway we both frequent to listen to Congolese Rhumba, a musical shrine of sorts which Osusa has since christened The Church.`,
    link: 'https://thelagosreview.ng/tabu-osusa-the-making-of-an-international-music-champion-isaac-otidi-amuke/',
    image: '/updates/up2.jpg',
  },
  // Add more updates here
];

export default function UpdatesPage() {
  return (
    <div className="updates-container">
      <h1 className="updates-heading">Updates</h1>
      <div className="updates-list">
        {updates.map((post, index) => (
          <div className="update-card" key={index}>
            <div className="update-content-wrapper">
              <div className="update-text">
                <div className="update-date">{post.date}</div>
                <h2 className="update-title">{post.title}</h2>
                <p className="update-content">{post.content}</p>
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="update-link"
                  >
                    {post.link.includes('youtube') ? 'Watch Full Episode ▶️' : 'Read Full Article →'}
                  </a>
                )}
              </div>

              {post.image && (
                <div className="update-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="update-image"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
