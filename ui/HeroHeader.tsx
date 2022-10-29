import BulbIcon from "@icons/BulbIcon"
import { FC, PropsWithChildren } from "react"

interface HeroHeaderProps extends PropsWithChildren {}

const HeroHeader: FC<HeroHeaderProps> = () => {
  return (
    <div className="h-48 md:h-64 p-2 dark:text-gray-300">
      <div className="h-full flex gap-4 justify-center items-center">
        <BulbIcon className="w-16 h-16" />
        <div className="flex flex-col">
          <span className="text-2xl md:text-4xl font-semibold">
            Nick&apos;s Universum
          </span>
          <p className="font-thin text-xl">Thoughts, stories and ideas.</p>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader
