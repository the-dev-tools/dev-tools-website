import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllPosts } from '@/lib/blog'

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-white mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold text-white mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold text-white mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
  a: (props: any) => <a className="text-neon hover:underline" {...props} />,
  code: (props: any) => <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-sm" {...props} />,
  pre: (props: any) => (
    <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6" {...props} />
  ),
  ul: (props: any) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-neon/50 pl-4 italic text-slate-300 my-4" {...props} />
  ),
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>

          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{post.author.name}</span>
            </div>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-neon/10 text-neon rounded-full border border-neon/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert prose-slate max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}
