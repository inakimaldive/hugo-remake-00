import { notFound } from "next/navigation"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogGrid } from "@/components/blog/blog-grid"
import { getAllPosts, getAllTags } from "@/lib/blog"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const allPosts = await getAllPosts()
  const decodedTag = decodeURIComponent(tag).replace(/-/g, " ")

  const posts = allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === decodedTag.toLowerCase()),
  )

  if (posts.length === 0) {
    notFound()
  }

  return (
    <BlogLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Posts tagged "{decodedTag}"</h1>
          <p className="text-muted-foreground">{posts.length} posts found</p>
        </div>
        <BlogGrid posts={posts} />
      </div>
    </BlogLayout>
  )
}
