import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
// This path jump (../sanity/) is critical because your env.ts is inside the sanity folder
import { apiVersion, dataset, projectId } from '../sanity/env' 

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensures you see your changes immediately after hitting 'Publish'
})

// Helper for images - fixes the 'urlFor' export error in your updates page
const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

/** * SHIFTED LOGIC: 
 * We are replacing the manual 'fetch' and 'API_BASE_URL' with Sanity GROQ queries. 
 * This is why the code looks shorter—Sanity handles the 'res.ok' and '.json()' internally.
 */

export async function fetchArtists() {
  return await client.fetch(`*[_type == "artist"] | order(name asc)`)
}

export async function fetchBooks() {
  return await client.fetch(`*[_type == "book"] | order(releaseDate desc)`)
}

export async function fetchPosts() {
  return await client.fetch(`*[_type == "post"] | order(_createdAt desc)`)
}

// FIXED: Changed type matcher from "update" to "updates" to target your live collection
export async function fetchUpdates() {
  return await client.fetch(`*[_type == "updates"] | order(date desc, _createdAt desc)`)
}