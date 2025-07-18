"use client"

import { useState } from "react"
import type { BlogPost } from "@/lib/blog"
import { FeaturedPost } from "./featured-post"
import { BlogHorizontalCard } from "./blog-horizontal-card"
import { Button } from "@/components/ui/button"

const POSTS_PER_LOAD = 6

interface Props {
  posts: BlogPost[]
}

export default function BlogHome({ posts }: Props) {
  const [visible, setVisible] = useState(POSTS_PER_LOAD)

  const featured = posts[0]
  const recent = posts.slice(1, visible + 1)
  const hasMore = visible + 1 < posts.length

  return (
    <div className="space-y-8">
      {featured && <FeaturedPost post={featured} />}

      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 gap-6">
          {recent.map((p, i) => (
            <BlogHorizontalCard
              key={p.slug}
              post={p}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => setVisible((v) => v + POSTS_PER_LOAD)} variant="outline">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
