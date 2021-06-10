import { ScreenType, useScreenType } from "@hooks/useScreenType"
import { FC } from "react"

interface MainGridProps {
  className?: string
}

const MainGrid: FC<MainGridProps> = ({ className = "", children }) => {
  const screenType = useScreenType()
  let gridStyle = ""
  let colGap = ""

  switch (screenType) {
    case ScreenType.Desktop:
      gridStyle = "240px 2fr 1fr"
      colGap = "1rem"
      break
    case ScreenType.Tablet:
      gridStyle = "2fr 5fr"
      colGap = "1rem"
      break
    case ScreenType.Mobile:
      gridStyle = "1fr"
      colGap = "0.5rem"
      break
  }

  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: gridStyle,
        columnGap: "1rem",
      }}
    >
      {children}
    </div>
  )
}

export default MainGrid
