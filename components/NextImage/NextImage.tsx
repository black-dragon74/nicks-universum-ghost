import Image from "next/image"
import { Dimensions } from "@lib/images"
import { ComponentPropsWithNode } from "rehype-react"

interface NextImageProps {
  src: string
  className?: string[]
}

const NextImage = (props: ComponentPropsWithNode) => {
  const { node } = props
  if (!node) return null

  const imageDimensions = node.imageDimensions as Dimensions
  const { src, className: classArray } = node.properties as NextImageProps
  const className = classArray.join(" ")

  return (
    <div className="flex root-image">
      <div {...{ className }}>
        <Image src={src} {...imageDimensions} {...{ className }} />
      </div>
    </div>
  )
}

export default NextImage
