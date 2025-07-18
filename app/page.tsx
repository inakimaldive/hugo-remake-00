import { ClientHomePage } from "./ClientHomePage"

export const metadata = {
  title: "Stack Blog",
  description: "Modern Next.js blog powered by Markdown, Tailwind CSS and AI-ready components.",
}

export default async function HomePage() {
  return <ClientHomePage />
}
