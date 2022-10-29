import { FC } from "react"
import Image from "next/image"
import { GhostPostOrPage } from "types/GhostPostOrPage"

interface PostCardProps {
  post: GhostPostOrPage
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const {
    title,
    primary_tag,
    feature_image,
    excerpt,
    published_at,
    timeToRead,
    primary_author,
  } = post

  return (
    <article className="relative p-6 flex flex-col grow shrink basis-1/1 md:basis-1/2 xl:basis-1/3 min-h-[220px]">
      {/* Treat this div as an image tag, because we are using fill on next/image */}
      <div className="relative h-[250px] md:h-[180px] lg:h-[200px] w-full overflow-hidden">
        <Image
          src={feature_image || "/images/placeholder.jpg"}
          layout="fill"
          alt="ayega"
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        />
      </div>

      <header className="mt-4 mb-2">
        <p className="uppercase text-sm text-blue-400 mb-1">
          {primary_tag.name}
        </p>
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200 line-cla">
          {title || "Post Title"}
        </h1>
      </header>

      <section>
        <p className="text-gray-500 dark:text-gray-300 text-left mb-2 line-clamp-3">
          {excerpt || "Post Excerpt"}
        </p>
      </section>

      <footer className="flex gap-2 items-center">
        <div className="rounded-full w-10 h-10 overflow-hidden relative bg-pink-400">
          <Image
            src={primary_author.profile_image || "/images/placeholder.jpg"}
            layout="fill"
            alt={primary_author.name}
          />
        </div>
        <div className="flex flex-col">
          <p className="uppercase font-medium text-gray-700 dark:text-gray-400">
            {primary_author.name || "Author"}
          </p>
          <small className="uppercase text-gray-500 dark:text-gray-300">
            {new Date(published_at).toLocaleDateString("en-IN") || "Today"} •{" "}
            {timeToRead}
          </small>
        </div>
      </footer>
    </article>
  )
}

export default PostCard
