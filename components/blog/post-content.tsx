import Image from "next/image"
import { Calendar, Clock, Tag, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog"
import Link from "next/link"

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="space-y-8">
      {/* Single Card wrapping everything */}
      <Card className="overflow-hidden">
        {/* Hero Image with overlay content */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Title and metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4" />
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <CardContent className="p-6 md:p-8">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>
    </article>
  )
}
