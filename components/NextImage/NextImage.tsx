import Image from "next/image"
import { Dimensions } from "@lib/images"
import { Element } from "hast"

interface NextImageProps extends Dimensions {
  src: string
  className?: string[]
}

const NextImage = (node: Element) => {
  if (!node) return null

  const {
    src,
    width,
    height,
    className: classArray,
  } = node.properties as unknown as NextImageProps
  const className = classArray.join(" ")

  return (
    <div className="flex root-image">
      <div {...{ className }}>
        <Image
          alt="TODO" // TODO: Add alt functionality, it is likely there on the props, extract it
          src={src}
          width={width}
          height={height}
          {...{ className }}
        />
      </div>
    </div>
  )
}

export default NextImage
