import "../styles/globals.scss"
import { AppProps } from "next/app"
import ReactModal from "react-modal"
import { SearchContextProvider } from "contexts/SearchContext"
import useScrollPreserver from "@hooks/useScrollPreserver"

ReactModal.setAppElement("#__next")

function MyApp({ Component, pageProps }: AppProps) {
  useScrollPreserver()

  return (
    <SearchContextProvider>
      <Component {...pageProps} />
    </SearchContextProvider>
  )
}

export default MyApp
