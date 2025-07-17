"use client"

import { useState } from "react"
import { Header } from "./header"
import { MobileNav } from "./mobile-nav"

export function HeaderWithMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Header onMobileNavToggle={() => setOpen((p) => !p)} />
      {open && (
        <>
          {/* dark translucent backdrop */}
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />
          <MobileNav isOpen={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  )
}
