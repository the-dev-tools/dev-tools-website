import Link from 'next/link'
import { getPostsByAuthor, getAllAuthors } from '@/lib/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map(author => ({ author: encodeURIComponent(author) }))
}

export function generateMetadata({ params }: { params: { author: string } }): Metadata {
  const author = decodeURIComponent(params.author)
  return {
    title: `${author} – DevTools Blog`,
    description: `Articles written by ${author}.`,
    alternates: { canonical: `/blog/author/${params.author}/` },
  }
}

export default async function AuthorPage({ params }: { params: { author: string } }) {
  const authorName = decodeURIComponent(params.author)
  const posts = await getPostsByAuthor(authorName)

  if (posts.length === 0) {
    notFound()
  }

  const author = posts[0].author

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <Link href="/blog" className="text-neon hover:underline text-sm mb-4 inline-block">
        &larr; Back to Blog
      </Link>

      <div className="flex items-center gap-4 mb-8">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-white">{author.name}</h1>
          <p className="text-slate-400">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition hover:border-neon/30 hover:bg-white/10">
                {post.image && (
                  <img
                    src={post.image.url}
                    alt={post.image.alt}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="mb-3 text-sm text-slate-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-neon transition">
                    {post.title}
                  </h2>

                  <p className="text-slate-300 text-sm mb-4">{post.summary}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-neon/10 text-neon rounded border border-neon/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
