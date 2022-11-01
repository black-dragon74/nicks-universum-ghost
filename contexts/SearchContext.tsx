import getPostsViaFetch from "@lib/getPostsViaFetch"
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export interface SearchContextProps {
  title: string
  slug: string
  author: string
  published_date: string
  time_to_read: string
}

const SearchContext = createContext<SearchContextProps[]>([])

const SearchContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [posts, setPosts] = useState<SearchContextProps[]>([])

  useEffect(() => {
    ;(async () => {
      const allPosts = await getPostsViaFetch()
      const f = allPosts.map(
        p =>
          ({
            title: p.title,
            slug: p.slug,
            author: p.primary_author.name,
            published_date: p.published_at,
            time_to_read: "" + p.reading_time,
          } as SearchContextProps)
      )
      setPosts(f)
    })()
  }, [])

  return (
    <SearchContext.Provider
      value={useMemo(() => {
        return posts
      }, [posts])}
    >
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchContextProvider }
