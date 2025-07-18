import { getAllPosts } from "@/lib/blog"
import { BlogLayout } from "@/components/layout/blog-layout"
import BlogHomeClient from "@/components/blog/blog-home"

export const metadata = {
  title: "Stack Blog",
  description: "Modern Next.js blog powered by Markdown, Tailwind CSS, and AI-ready components.",
}

// Server Component – safe to call fs
export default async function HomePage() {
  const posts = await getAllPosts() // runs on server only

  return (
    <BlogLayout>
      {/* BlogHome is `"use client"` and handles interactivity */}
      <BlogHomeClient posts={posts} />
    </BlogLayout>
  )
}
