"use client"
import BlogHome from "@/components/blog/blog-home"

// Server Component – safe to call fs
export default async function BlogHomeClient({ posts }: any) {
  return <BlogHome posts={posts} />
}
