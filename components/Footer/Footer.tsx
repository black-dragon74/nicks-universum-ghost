import { ScreenType, useScreenType } from "../../hooks/useScreenType"

const Footer = () => {
  const screenType = useScreenType()
  const isMobile = screenType === ScreenType.FullScreen

  return (
    <div className="px-4 p-20 w-full">
      <div
        className="grid"
        style={{
          gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
          rowGap: isMobile ? "50px" : "",
        }}
      >
        <h2 className="w-full flex items-center justify-center text-primary">
          Nick&apos;s Universum
        </h2>
        <nav className="flex">
          <ul className="w-full flex justify-center items-center gap-20 text-primary-100">
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
          </ul>
        </nav>
        <h2 className="flex text-primary justify-center">&copy; 2021 Nick</h2>
      </div>
    </div>
  )
}

export default Footer
