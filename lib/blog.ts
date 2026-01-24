import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
      content
    }
  } catch {
    return null
  }
}
