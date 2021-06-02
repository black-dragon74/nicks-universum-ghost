import Link from "next/link"
import Image from "next/image"
import { FC } from "react"
import styles from "../../styles/PostCard.module.scss"

type PostCardProps = {
  left?: boolean
}

const imgWidth = 814
const imgHeight = 354

const PostCard: FC<PostCardProps> = ({ left = true }) => {
  return (
    <div className="text-center justify-between bg-primary-800 opacity-80 hover:opacity-100 lg:grid lg:grid-cols-2 my-6">
      {/* Image thingie */}
      {left && (
        <div className="hidden lg:block">
          <Image
            src="/images/one-who-left.png"
            width={814}
            height={345}
            layout="responsive"
          />
        </div>
      )}

      <div className="lg:hidden">
        <Image
          src="/images/one-who-left.png"
          width={814}
          height={345}
          layout="responsive"
        />
      </div>

      {/* This contains the rest of the shiz */}
      <div className="flex flex-col p-5 justify-evenly">
        <h4 className="text-primary-200 font-semibold">SEP 7, 1998 / BLOG</h4>
        <h2 className="font-bold text-2xl my-4 text-primary-100">
          TO ONE WHO LEFT
        </h2>

        <div className="w-24 h-2 mx-auto bg-primary-300 mb-5" />
        <p
          className="text-primary-100 line-clamp-1 mx-auto text-lg my-5"
          style={{ maxWidth: "60%" }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          natus dolorum doloremque nisi provident sunt assumenda excepturi
          pariatur. Ipsam perspiciatis aspernatur quasi iste suscipit
          consectetur provident quae ratione ea deserunt.
        </p>
        <Link href="#">
          <p
            id={styles.postReadMore}
            className="transition-colors self-center duration-500 cursor-pointer uppercase font-bold text-primary-200 hover:text-primary-100"
          >
            Continue Reading
          </p>
        </Link>
      </div>

      {!left && (
        <div className="hidden lg:block">
          <Image
            src="/images/one-who-left.png"
            width={814}
            height={345}
            layout="responsive"
          />
        </div>
      )}
    </div>
  )
}

export default PostCard
