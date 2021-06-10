import { FC, ReactNode } from "react"
import { MainLayout } from "./MainLayout"

interface DefaultLayoutProps {
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  mobileHeader?: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({
  leftPanel,
  rightPanel,
  mobileHeader,
  children,
}) => {
  return (
    <MainLayout
      leftPanel={leftPanel}
      rightPanel={rightPanel}
      mobileHeader={mobileHeader}
    >
      {children}
    </MainLayout>
  )
}

export { DefaultLayout }
