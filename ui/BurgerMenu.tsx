import { FC } from "react"
import styles from "../styles/BurgerMenu.module.scss"

interface BurgerMenuProps {
  onClick: () => void
  open: boolean
}

const BurgerMenu: FC<BurgerMenuProps> = ({ onClick, open }) => {
  return (
    <div
      className={`${styles.burgerMenu} ${open ? styles.open : ""}`}
      onClick={onClick}
      role="button"
    >
      <div className={styles.inner} />
    </div>
  )
}

export default BurgerMenu
