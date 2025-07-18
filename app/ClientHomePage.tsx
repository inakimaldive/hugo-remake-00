"use client"
import { BlogLayout } from "@/components/layout/blog-layout"
import BlogHome from "@/components/blog/blog-home"

interface Props {
  posts: any
}

export default function ClientHomePage({ posts }: Props) {
  return (
    <BlogLayout>
      <BlogHome posts={posts} />
    </BlogLayout>
  )
}
