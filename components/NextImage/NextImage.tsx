import Image from "next/image"
import { ComponentPropsWithNode } from "rehype-react"

interface NextImageProps {
  src: string
  className?: string
  alt?: string
  width?: string
  height?: string
}

const NextImage = (props: ComponentPropsWithNode) => {
  const { node } = props
  const { src, className, alt, width, height } =
    node?.properties as NextImageProps
  const wrapperClass = "relative flex " + className + " " || ""

  return (
    <div className={wrapperClass}>
      <Image
        alt={alt || ""}
        src={src}
        className={height && width ? "absolute" : ""}
        width={width}
        height={height}
        objectFit="cover"
      />
    </div>
  )
}

export default NextImage
