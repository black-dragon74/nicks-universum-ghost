import { useMediaQuery } from "react-responsive"

export enum ScreenType {
  Desktop = 1,
  Tablet,
  Mobile,
}

// In css width breakpoints are mostly multiples of 256px

export const useScreenType = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 }) // 1024px or above is Desktop
  const isTablet = useMediaQuery({ minWidth: 768 }) // 768px < width < 1024px is Tablet

  if (isDesktop) return ScreenType.Desktop // lg
  if (isTablet) return ScreenType.Tablet // md

  return ScreenType.Mobile // sm, xs  // Less than 768px is mobile
}
