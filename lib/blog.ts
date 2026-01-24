import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogCTA {
  heading: string
  body: string
  buttonText: string
  url: string
  secondaryText?: string
  secondaryUrl?: string
}

export interface BlogCTAConfig {
  primary?: BlogCTA
  secondary?: BlogCTA
  badge?: {
    text: string
    variant: 'neutral' | 'success' | 'warning'
  } | null
}

export interface BlogPost {
  slug: string
  title: string
  summary: string
  date: string
  author: {
    name: string
    avatar?: string
  }
  tags: string[]
  category?: string
  image?: {
    url: string
    alt: string
  }
  cta?: BlogCTAConfig
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR)

  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(CONTENT_DIR, file)
      const fileContent = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContent)

      return {
        slug,
        title: data.title,
        summary: data.summary,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        category: data.category,
        image: data.image,
        cta: data.cta,
        content
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title,
      summary: data.summary,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      category: data.category,
      image: data.image,
      cta: data.cta,
      content
    }
  } catch {
    return null
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}

export async function getAllAuthors(): Promise<string[]> {
  const posts = await getAllPosts()
  const authors = new Set<string>()
  posts.forEach(post => {
    if (post.author?.name) authors.add(post.author.name)
  })
  return Array.from(authors).sort()
}

export async function getPostsByAuthor(authorName: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.author?.name === authorName)
}
