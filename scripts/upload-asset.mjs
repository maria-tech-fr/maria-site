import { getCliClient } from 'sanity/cli'
import fs from 'fs'

const client = getCliClient()
const file = fs.readFileSync('/tmp/blog-placeholder.svg')
const asset = await client.assets.upload('image', file, {
  filename: 'blog-placeholder.svg',
  contentType: 'image/svg+xml',
})
console.log('ASSET_ID:', asset._id)
