import { notFound } from "next/navigation"
import { BlogLayout } from "@/components/layout/blog-layout"
import { PostContent } from "@/components/blog/post-content"
import { RelatedPosts } from "@/components/blog/related-posts"
import { getAllPosts, getPostBySlug } from "@/lib/blog"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <BlogLayout>
      <div className="space-y-8">
        <PostContent post={post} />
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </div>
    </BlogLayout>
  )
}
