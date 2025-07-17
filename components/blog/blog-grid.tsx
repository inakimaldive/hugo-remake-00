// This component is no longer used on the homepage, but kept for reference or other potential uses.
// No changes needed here.
"use client"

import { useState } from "react"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"

interface BlogGridProps {
  posts: BlogPost[]
  showLoadMore?: boolean
}

export function BlogGrid({ posts, showLoadMore = false }: BlogGridProps) {
  const [visiblePosts, setVisiblePosts] = useState(6)

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6)
  }

  const displayedPosts = posts.slice(0, visiblePosts)
  const hasMore = visiblePosts < posts.length

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedPosts.map((post, index) => (
          <BlogCard
            key={post.slug}
            post={post}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} variant="outline">
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  )
}
