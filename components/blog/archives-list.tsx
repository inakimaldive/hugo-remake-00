"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"

interface ArchivesListProps {
  posts: BlogPost[]
}

export function ArchivesList({ posts }: ArchivesListProps) {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set())

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, BlogPost[]>,
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  return (
    <div className="space-y-4">
      {years.map((year) => {
        const yearPosts = postsByYear[year]
        const isExpanded = expandedYears.has(year)

        return (
          <Card key={year} className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {year} ({yearPosts.length} posts)
                </div>
                <Button variant="ghost" size="sm" onClick={() => toggleYear(year)}>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>

            {isExpanded && (
              <CardContent>
                <div className="space-y-3">
                  {yearPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                      <div className="flex items-start justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                        <div className="space-y-1 flex-1">
                          <h3 className="font-medium group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        </div>
                        <div className="text-sm text-muted-foreground ml-4 flex-shrink-0">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
