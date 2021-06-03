import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScreenType, useScreenType } from "../../hooks/useScreenType"

type PostCardProps = {
  left?: boolean
  date?: string
  tag?: string
  title?: string
  excerpt?: string
  readMoreLink?: string
  imgURL?: string
  readTime: string
}

const PostCard: FC<PostCardProps> = ({
  left = true,
  date,
  tag,
  title,
  excerpt,
  readMoreLink,
  imgURL,
  readTime,
}) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))

  const isMobile = useScreenType() >= ScreenType.FullScreen
  const imgPosition = !isMobile && !left ? { gridColumn: "2/3" } : {}
  const readMoreLocalURL = "/" + readMoreLink
  return (
    <div
      className="grid my-8 bg-primary-800 text-primary-100 opacity-80 hover:opacity-100"
      style={{
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gridAutoFlow: "row dense",
        gridAutoRows: isMobile ? "250px" : "max-content",
      }}
    >
      <div
        className="img-container relative cursor-pointer"
        style={{ height: "250px", ...imgPosition }}
      >
        <Link href={readMoreLocalURL}>
          <a>
            <Image
              className="absolute"
              src={imgURL}
              layout="fill"
              sizes="(max-width: 640px) 320px, (max-width: 1000px) 500px, 680px"
              objectFit="cover"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col p-5 justify-evenly items-center">
        <span className="text-primary-300 font-bold">{`${formattedDate} / ${tag}`}</span>

        <Link href={readMoreLocalURL}>
          <a className="text-3xl text-center text-primary-200 line-clamp-2">
            {title}
          </a>
        </Link>

        <span className="post-card-separator bg-primary-600"></span>

        <p className="line-clamp-2 text-center">{excerpt}</p>

        <Link href={readMoreLocalURL}>
          <a className="font-bold read-more-link">Continue Reading</a>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
