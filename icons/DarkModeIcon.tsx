import { FC, SVGProps } from "react"

interface DarkModeIconProps extends SVGProps<SVGSVGElement> {}

const DarkModeIcon: FC<DarkModeIconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <title>Contrast</title>
      <circle
        cx="256"
        cy="256"
        r="208"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        stroke="currentColor"
        d="M256 464c-114.88 0-208-93.12-208-208S141.12 48 256 48z"
      />
    </svg>
  )
}

export default DarkModeIcon
