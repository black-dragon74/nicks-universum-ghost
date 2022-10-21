import { ScreenType, useScreenType } from "@hooks/useScreenType"
import React, { FC, ReactNode } from "react"
import MainGrid from "ui/MainGrid"

interface MainLayoutProps {
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  mobileHeader?: ReactNode
}

const MainLayout: FC<React.PropsWithChildren<MainLayoutProps>> = ({
  leftPanel = <div />,
  rightPanel = <div />,
  mobileHeader = <div />,
  children,
}) => {
  const screenType = useScreenType()
  const prepend = null
  let gridContents = null

  switch (screenType) {
    case ScreenType.Desktop:
      gridContents = (
        <>
          {leftPanel}
          {children}
          {rightPanel}
        </>
      )
      break
    case ScreenType.Tablet:
      gridContents = (
        <>
          {leftPanel}
          {children}
        </>
      )
      break
    case ScreenType.Mobile:
      gridContents = <>{children}</>
      break
  }

  return (
    <div className="flex flex-col w-full">
      <MainGrid>{gridContents}</MainGrid>
    </div>
  )
}

export { MainLayout }
