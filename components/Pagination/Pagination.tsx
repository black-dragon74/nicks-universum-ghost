import { FC } from "react"
import { PaginationType } from "../../types/PaginationType"
import Link from "next/link"

interface PaginationProps {
  paginationData: PaginationType
}

const Pagination: FC<PaginationProps> = ({ children: _, paginationData }) => {
  const { limit, next, page, pages, prev, total } = paginationData
  const pageItems = [...Array(pages).keys()].map(i => i + 1)
  const prevLink = prev === 1 ? "/" : `/page/${prev}`

  return (
    <div className="flex justify-center gap-4 items-center text-primary-300 font-bold">
      {prev !== null && (
        <Link href={prevLink}>
          <a>Prev</a>
        </Link>
      )}
      {pageItems.map(pageno => {
        const link = pageno === 1 ? "/" : `/page/${pageno}`
        return (
          <Link key={pageno} href={link}>
            <a className={`${page === pageno ? "text-primary" : ""}`}>
              {pageno}
            </a>
          </Link>
        )
      })}
      {next !== null && (
        <Link href={`/page/${next}`}>
          <a>Next</a>
        </Link>
      )}
    </div>
  )
}

export default Pagination
