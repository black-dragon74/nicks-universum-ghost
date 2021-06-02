import { useLayoutEffect, useRef, useState } from "react"
import { ScreenType, useScreenType } from "../../hooks/useScreenType"
import BurgerMenu from "../../ui/BurgerMenu"
import { ClientFC } from "../../types/ClientFC"

interface HeaderProps {}

const Header: ClientFC<HeaderProps> = ({}) => {
  const screenType = useScreenType()
  const mobile = screenType === ScreenType.FullScreen
  const desktop = screenType < ScreenType.FullScreen

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerHeight = useRef<number>(0)

  const headerClassMobile =
    mobile && mobileMenuOpen
      ? "p-4 fixed top-0 right-0 left-0 bottom-0 z-40 bg-primary-900"
      : ""
  const navClass = mobile ? "" : "mx-auto"

  useLayoutEffect(() => {
    const el = document.querySelector("#navBar")
    if (!el) return
    headerHeight.current = el.getBoundingClientRect().height
  })

  return (
    <>
      {mobile && mobileMenuOpen ? (
        <div
          style={{ height: headerHeight.current + 28 }}
          className="w-full opacity-0"
        >
          FACADE
        </div>
      ) : null}
      <header
        className={`transition duration-500 py-4 text-2xl text-white ${headerClassMobile}`}
      >
        <nav
          id="navBar"
          className={`grid ${navClass}`}
          style={{
            height: mobile ? "100%" : "",
            gridTemplateColumns: mobile ? "1fr" : "auto auto 1fr",
            gridTemplateRows: mobile ? "auto 1fr auto" : "",
            maxWidth: "1200px",
          }}
        >
          <div
            className={`flex w-full justify-between ${mobile ? "" : "mr-5"}`}
          >
            Nick&apos;s Universum
            {mobile ? (
              <BurgerMenu
                onClick={() => setMobileMenuOpen(s => !s)}
                open={mobileMenuOpen}
              />
            ) : null}
          </div>
          <div
            className={`${
              mobileMenuOpen || desktop ? "flex" : "hidden"
            } justify-center items-center flex-wrap`}
          >
            <ul className={`flex text-center ${mobile ? "flex-col" : ""}`}>
              <li className="mr-3">One</li>
              <li className="mr-3">Two</li>
              <li className="mr-3">Three</li>
              <li className="mr-3">Four</li>
            </ul>
          </div>
          <div
            className={`${mobileMenuOpen || desktop ? "flex" : "hidden"} ${
              mobile ? "justify-center" : "justify-end"
            }`}
          >
            Footer
          </div>
        </nav>
      </header>
    </>
  )
}

Header.clientOnly = true
export default Header
