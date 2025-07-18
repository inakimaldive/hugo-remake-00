"use client"

import { BlogLayout } from "@/components/layout/blog-layout"
import BlogHome from "@/components/blog/blog-home"
import { getAllPosts } from "@/lib/blog"

export async function ClientHomePage() {
  const posts = await getAllPosts() // executes on the server

  return (
    <BlogLayout>
      <BlogHome posts={posts} /> {/* BlogHome is `"use client"` */}
    </BlogLayout>
  )
}
