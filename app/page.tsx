import ClientHomePage from "./ClientHomePage"
import { getAllPosts } from "@/lib/blog"

export const metadata = {
  title: "Stack Blog",
  description: "Modern Next.js blog powered by Markdown, Tailwind CSS and AI-ready components.",
}

export default async function HomePage() {
  const posts = await getAllPosts() // runs only on the server

  return <ClientHomePage posts={posts} />
}
