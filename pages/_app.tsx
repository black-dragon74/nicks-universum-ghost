import "../styles/globals.scss"
import isServer from "../lib/isServer"
import { ClientFC } from "../types/ClientFC"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  // This is so we don't have to use "next/dynamic" at page level
  if (isServer && (Component as ClientFC<unknown>).clientOnly) {
    console.log(
      `Skipped clientonly compoment ${
        Component?.displayName || "Unnamed"
      }'s rendering on server`
    )
    return null
  }

  return <Component {...pageProps} />
}

export default MyApp
