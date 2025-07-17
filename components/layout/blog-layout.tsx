import type { ReactNode } from "react"
import { HeaderWithMobileNav } from "./header-with-mobile-nav"
import { LeftSidebar } from "./left-sidebar"
import { RightSidebar } from "./right-sidebar"

interface Props {
  children: ReactNode
}

// Server Component (no "use client")
export function BlogLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <HeaderWithMobileNav />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <LeftSidebar />
            </div>
          </aside>

          <main className="lg:col-span-6">{children}</main>

          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
