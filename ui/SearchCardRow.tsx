import { FC } from "react"
import { SearchContextProps } from "contexts/SearchContext"
import { useRouter } from "next/router"

interface SearchCardRowProps extends SearchContextProps {
  close: () => void
}

const SearchCardRow: FC<SearchCardRowProps> = ({
  title,
  slug,
  author,
  published_date,
  time_to_read,
  close,
}) => {
  const { push } = useRouter()
  return (
    <div
      className="rounded-md p-4 shadow-md cursor-pointer"
      onClick={async () => {
        await push(`/${slug}`)
        close()
      }}
    >
      <p>{title}</p>
    </div>
  )
}

export default SearchCardRow
