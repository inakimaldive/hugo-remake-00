import { BlogHorizontalCard } from "./blog-horizontal-card" // Use the new horizontal card
import type { BlogPost } from "@/lib/blog"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Related Posts</h2>
      <div className="grid grid-cols-1 gap-6">
        {" "}
        {/* Changed to single column for horizontal cards */}
        {posts.map((post, index) => (
          <BlogHorizontalCard
            key={post.slug}
            post={post}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  )
}
