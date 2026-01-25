import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getPost, getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import BlogSidebar from '@/components/BlogSidebar'

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
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse border border-white/10 text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-slate-800/50" {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr className="border-b border-white/10" {...props} />,
  th: (props: any) => <th className="px-4 py-3 text-left font-semibold text-white border border-white/10" {...props} />,
  td: (props: any) => <td className="px-4 py-3 text-slate-300 border border-white/10" {...props} />,
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { alternates: { canonical: `/blog/${params.slug}/` } }
  return {
    title: `${post.title}`,
    description: post.summary,
    alternates: { canonical: `/blog/${params.slug}/` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://dev.tools/blog/${params.slug}/`,
      images: post.image ? [{ url: post.image.url, alt: post.image.alt }] : undefined,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
        <article>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-neon transition mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <header className="mb-12">
            {post.image && (
              <img
                src={post.image.url}
                alt={post.image.alt}
                className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
              />
            )}
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
                <Link
                  href={`/blog/author/${encodeURIComponent(post.author.name)}`}
                  className="flex items-center gap-2 hover:text-neon transition"
                >
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{post.author.name}</span>
                </Link>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs font-medium bg-neon/10 text-neon rounded-full border border-neon/30 hover:bg-neon/20 transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-slate max-w-none">
            <MDXRemote source={post.content} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
        </article>

        <div className="hidden lg:block">
          <BlogSidebar cta={post.cta} />
        </div>
      </div>
    </div>
  )
}
