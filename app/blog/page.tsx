import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default async function BlogPage() {
  const posts = await getAllPosts()

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
        <p className="text-lg text-slate-400 mb-12">
          Product updates, API testing insights, and developer workflows.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-slate-300">No blog posts yet. Check back soon!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
      <p className="text-lg text-slate-400 mb-12">
        Product updates, API testing insights, and developer workflows.
      </p>

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
