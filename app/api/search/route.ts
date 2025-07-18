import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""

  const allPosts = await getAllPosts()

  if (!query) {
    return NextResponse.json([])
  }

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )

  return NextResponse.json(filteredPosts)
}
