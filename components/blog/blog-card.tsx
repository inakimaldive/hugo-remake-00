import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPost
  className?: string
  style?: React.CSSProperties
}

export function BlogCard({ post, className, style }: BlogCardProps) {
  return (
    <Card className={`blog-card overflow-hidden ${className}`} style={style}>
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg?height=200&width=400"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString()}
          <Clock className="h-4 w-4 ml-2" />
          {post.readingTime} min read
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
