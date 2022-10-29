import withLinkToURL from "@components/withLinkToURL"
import useToggle from "@hooks/useToggle"
import BulbIcon from "@icons/BulbIcon"
import DarkModeIcon from "@icons/DarkModeIcon"
import GitHubIcon from "@icons/GitHubIcon"
import InstaIcon from "@icons/InstaIcon"
import toggleDarkMode from "@lib/toggleDarkMode"
import Link from "next/link"
import { FC, PropsWithChildren } from "react"

const InstaIconWithLink = withLinkToURL(InstaIcon)
const GitHubIconWithLink = withLinkToURL(GitHubIcon)

interface NavMenuProps extends PropsWithChildren {}

const NavMenu: FC<NavMenuProps> = () => {
  const [postTitle, _] = useToggle()
  return (
    <header className="sticky top-0 z-50 dark:text-gray-300 text-black">
      <div
        data-outer-div
        className=" dark:bg-muidark/80 bg-white/80 backdrop-blur-md"
      >
        <div data-inner-div id="nav-flex-wrapper" className="container p-2">
          <div className="flex  items-center justify-start overflow-scroll">
            {/* Logo start */}
            <Link href="/">
              <div
                data-logo-part
                // onClick={togglePostTitle}
                className="flex items-center mr-8 shrink-0 hover:text-gray-400 ease-in-out transition-colors duration-300 cursor-pointer"
              >
                <BulbIcon className="w-8 h-8 mr-2" />
                <div className="flex flex-col gap-0">
                  <p>Nick&apos;s Universum</p>
                  <small>Veni. Vidi. Vici.</small>
                </div>
              </div>
            </Link>
            {/* Logo end */}

            {/* Nav Menu Start */}
            <div className="relative overflow-hidden shrink-0">
              <p
                className={`absolute block top-0 transition-transform duration-200 ${
                  !postTitle && "translate-y-12"
                }`}
              >
                One that got away
              </p>
              <nav
                className={`flex gap-4 items-center transition-transform duration-200 ${
                  postTitle && "-translate-y-12"
                }`}
              >
                <Link href="/">
                  <a className="hover:text-gray-400 ease-in-out transition-colors duration-300">
                    Home
                  </a>
                </Link>
                <Link
                  href={`https://portfolio.nicksuniversum.com`}
                  target="_blank"
                >
                  <a className="hover:text-gray-400 ease-in-out transition-colors duration-300">
                    Portfolio
                  </a>
                </Link>
                <div className="w-24 md:hidden" />
              </nav>
            </div>
            {/* Nav Menu End */}

            {/* Start - Desktop Social Menu */}
            <div className="hidden md:flex items-center gap-8 ml-auto">
              <InstaIconWithLink className="w-6 h-6" href="/" />
              <GitHubIconWithLink className="w-6 h-6" href="/" />
              <DarkModeIcon
                className={`w-6 h-6 cursor-pointer hover:text-gray-400 ease-in-out transition-all duration-300 hover:rotate-180`}
                onClick={toggleDarkMode}
              />
            </div>
            {/* End - Desktop Social Menu */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavMenu
