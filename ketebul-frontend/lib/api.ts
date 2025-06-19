const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchArtists() {
  const res = await fetch(`${API_BASE_URL}/artists/`);
  if (!res.ok) throw new Error('Failed to fetch artists');
  return res.json();
}

export async function fetchBooks() {
  const res = await fetch(`${API_BASE_URL}/books/`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_BASE_URL}/posts/`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
