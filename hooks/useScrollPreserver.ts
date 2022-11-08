// Preserve scroll position when navigating between pages in Next.js

import InMemoryStore from "@lib/inMemoryStore"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

export const useScrollPreserver = () => {
  const router = useRouter()
  const scrollingBack = useRef<boolean>(false)

  useEffect(() => {
    // Exit if window and document are not available
    if (typeof window === "undefined" || typeof document === "undefined") return

    // Just to keep track if the user has pressed the back button
    router.beforePopState(() => {
      scrollingBack.current = true

      // Allow next router to continue
      return true
    })

    const onRouteChangeStart = () => {
      InMemoryStore.shared.set(
        router.pathname,
        document.documentElement.scrollTop
      )
    }

    const onRouteChangeComplete = (url: string) => {
      const savedLoc = InMemoryStore.shared.get(url)

      if ((scrollingBack.current || url === "/") && savedLoc) {
        document.scrollingElement.scroll({
          top: savedLoc,
        })
      }

      scrollingBack.current = false
    }

    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router])
}

export default useScrollPreserver
