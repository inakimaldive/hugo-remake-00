import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Card className="blog-card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-64 lg:h-full overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg?height=400&width=600"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>
        </Link>

        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Badge variant="default">Featured</Badge>
            <Calendar className="h-4 w-4 ml-2" />
            {new Date(post.date).toLocaleDateString()}
            <Clock className="h-4 w-4 ml-2" />
            {post.readingTime} min read
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl lg:text-3xl font-bold hover:text-primary transition-colors mb-4">{post.title}</h2>
          </Link>

          <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.slice(0, 4).map((tag) => (
              <Link key={tag} href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
