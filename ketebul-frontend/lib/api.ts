import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../sanity/env' 

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
})

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

export async function fetchArtists() {
  return await client.fetch(`*[_type == "artist"] | order(name asc)`)
}

export async function fetchBooks() {
  return await client.fetch(`*[_type == "book"] | order(releaseDate desc)`)
}

export async function fetchPosts() {
  return await client.fetch(`*[_type == "post"] | order(_createdAt desc)`)
}

// ALIGNED WITH VISION: Querying the correct singular '_type == "update"' document collection
export async function fetchUpdates() {
  return await client.fetch(`*[_type == "update"] | order(date desc, _createdAt desc)`)
}