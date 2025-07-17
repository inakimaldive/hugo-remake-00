"use client"

import { useState } from "react"
import { BlogHorizontalCard } from "./blog-horizontal-card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"

const STEP = 6

interface Props {
  posts: BlogPost[]
}

export function RecentPosts({ posts }: Props) {
  const [visible, setVisible] = useState(STEP)

  const loadMore = () => setVisible((v) => v + STEP)
  const hasMore = visible < posts.length

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {posts.slice(0, visible).map((post, i) => (
          <BlogHorizontalCard
            key={post.slug}
            post={post}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={loadMore}>
            Load More Posts
          </Button>
        </div>
      )}
    </>
  )
}
