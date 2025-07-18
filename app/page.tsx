"use client"

import { useState, useEffect } from "react"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogHorizontalCard } from "@/components/blog/blog-horizontal-card" // Import the new component
import { FeaturedPost } from "@/components/blog/featured-post"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/blog"
import type { BlogPost } from "@/lib/blog"

const POSTS_PER_LOAD = 6 // Number of posts to load at a time

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_LOAD)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getAllPosts()
      setPosts(allPosts)
      setFeaturedPost(allPosts[0] || null)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const recentPosts = posts.slice(1, visiblePostsCount + 1) // Slice from index 1 to exclude featured post

  const handleLoadMore = () => {
    setVisiblePostsCount((prevCount) => prevCount + POSTS_PER_LOAD)
  }

  const hasMorePosts = visiblePostsCount + 1 < posts.length // +1 because we exclude the featured post

  if (loading) {
    return (
      <BlogLayout>
        <div className="text-center py-10">Loading posts...</div>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout>
      <div className="space-y-8">
        {featuredPost && <FeaturedPost post={featuredPost} />}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid grid-cols-1 gap-6">
            {recentPosts.map((post, index) => (
              <BlogHorizontalCard
                key={post.slug}
                post={post}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
          {hasMorePosts && (
            <div className="flex justify-center mt-8">
              <Button onClick={handleLoadMore} variant="outline">
                Load More Posts
              </Button>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  )
}
