// Ketebul Music — Sanity Import Script
// 
// SETUP (run once in your project root):
//   npm install @sanity/client
//
// USAGE:
//   node sanity_import.js
//
// Get your write token at:
//   https://www.sanity.io/manage → your project → API → Tokens → Add token (Editor)

const { createClient } = require('@sanity/client')
const fs = require('fs')

// ── CONFIG ────────────────────────────────────────────────────────────────────
const PROJECT_ID = 'e98nobks'
const DATASET    = 'production'
const TOKEN      = 'skBaaie0jNvDgROko4mzGuFsOrIisY0LJMq9iDreqYz2DhLQ9FSqgElHod7ojq7kuuwe8B4G8L7h5DLOPzcBEv60q51pGfH2JVUzBhnmRFUo3f5OSQyrY0zH93nqqHAfX58IiwCsanUzWNWULgg6rCWsLai4Mxm8xrM7OK4mbfW84WH1BFDu'  // ← only thing you need to change
// ─────────────────────────────────────────────────────────────────────────────

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2026-02-08',
  token:      TOKEN,
  useCdn:     false,
})

// Convert a WordPress HTML body string into a single Sanity portable text block.
// Rich HTML parsing requires a full transformer — this gives clean readable text
// in the CMS immediately, which Nick can then enrich post by post.
function toPortableText(rawBody, wpId) {
  if (!rawBody) return []

  // Strip all HTML tags cleanly
  const text = rawBody
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\[caption[^\]]*\].*?\[\/caption\]/gs, '') // remove WP shortcodes
    .replace(/\[[^\]]+\]/g, '')                          // remove remaining shortcodes
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#038;/g, '&')
    .replace(/\r\n/g, '\n')
    .trim()

  if (!text) return []

  // Split into paragraphs on double newlines
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean)

  return paragraphs.map((para, i) => ({
    _type: 'block',
    _key: `wp-${wpId}-p${i}`,
    style: 'normal',
    markDefs: [],
    children: [{
      _type: 'span',
      _key: `wp-${wpId}-p${i}-s0`,
      text: para,
      marks: [],
    }],
  }))
}

// Map the extracted JSON fields → your Sanity update schema
function toSanityDoc(post) {
  // Your schema uses 'date' (type: date) not 'publishedAt'
  const dateOnly = post.publishedAt
    ? post.publishedAt.slice(0, 10)   // "2011-04-16T..." → "2011-04-16"
    : null

  const doc = {
    _id:   post._id,
    _type: 'update',

    title:     post.title,
    slug:      post.slug,           // already { current: '...' }
    date:      dateOnly,            // matches your schema field name
    published: true,

    content: toPortableText(post.body, post._wp_id),  // matches your schema field name

    // Store original WP image URL in buttonLink temporarily so Nick can
    // see it and manually upload the image in Sanity Studio.
    // Once image is uploaded in Studio, clear this field.
    buttonLink: post.featuredImageUrl || null,
    buttonText: post.featuredImageUrl ? 'Original Image (upload to mainImage then clear)' : null,
  }

  // Remove null fields to keep documents clean
  Object.keys(doc).forEach(k => {
    if (doc[k] === null || doc[k] === undefined) delete doc[k]
  })

  return doc
}

async function run() {
  const raw = JSON.parse(fs.readFileSync('./ketebul_blog_posts.json', 'utf8'))
  const docs = raw.map(toSanityDoc)

  console.log(`\nReady to import ${docs.length} blog posts to project ${PROJECT_ID}/${DATASET}`)
  console.log('Sample doc:')
  console.log(JSON.stringify(docs[4], null, 2).slice(0, 600))
  console.log('\nStarting import...\n')

  let created = 0
  let skipped = 0
  const BATCH = 10

  for (let i = 0; i < docs.length; i += BATCH) {
    const batch = docs.slice(i, i + BATCH)
    const tx = client.transaction()

    batch.forEach(doc => {
      // createIfNotExists = safe to re-run, won't overwrite manual edits
      tx.createIfNotExists(doc)
    })

    try {
      const result = await tx.commit()
      created += batch.length
      process.stdout.write(`  ✓ ${created}/${docs.length} imported\r`)
    } catch (err) {
      console.error(`\n  ✗ Batch ${Math.floor(i/BATCH)+1} failed:`, err.message)
      skipped += batch.length
    }
  }

  console.log(`\n\nDone!`)
  console.log(`  Imported: ${created}`)
  console.log(`  Skipped:  ${skipped}`)
  console.log(`\nNext step: open Sanity Studio at /studio and check the Updates section.`)
  console.log(`For each post with a buttonLink showing an image URL, upload that image`)
  console.log(`to mainImage then clear buttonText and buttonLink.`)
}

run().catch(err => {
  console.error('\nFatal error:', err.message)
  if (err.message.includes('401')) {
    console.error('→ TOKEN is invalid. Get a new one at sanity.io/manage → API → Tokens')
  }
  if (err.message.includes('403')) {
    console.error('→ TOKEN does not have write access. Create an Editor token.')
  }
  process.exit(1)
})