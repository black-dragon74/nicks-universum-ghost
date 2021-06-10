import "../styles/globals.scss"
import { Context as ResponsiveContext } from "react-responsive"
import { useEffect, useState } from "react"
import isServer from "../lib/isServer"
import { ClientFC } from "../types/ClientFC"
import { AppProps } from "next/dist/next-server/lib/router/router"

function MyApp({ Component, pageProps }: AppProps) {
  // To fix rehydration warnings
  const [width, setWidth] = useState(500)
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", () => setWidth(window.innerWidth))

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth))
    }
  }, [])

  // This is so we don't have to use "next/dynamic" at page level
  if (isServer && (Component as ClientFC<unknown>).clientOnly) {
    console.log(
      `Skipped clientonly compoment ${
        Component?.displayName || "Unnamed"
      }'s rendering on server`
    )
    return null
  }

  return (
    <ResponsiveContext.Provider value={{ width }}>
      <Component {...pageProps} />
    </ResponsiveContext.Provider>
  )
}

export default MyApp
