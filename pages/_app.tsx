import "../styles/globals.scss"
import { AppProps } from "next/app"
import ReactModal from "react-modal"
import { SearchContextProvider } from "contexts/SearchContext"

ReactModal.setAppElement("#__next")

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <Component {...pageProps} />
    </SearchContextProvider>
  )
}

export default MyApp
