export default function toggleDarkMode() {
  // Exit if window is undefined
  if (typeof window === "undefined") return

  const mWindow = window as Window &
    typeof globalThis & { userHasCustomDarkModePref?: boolean }

  mWindow.userHasCustomDarkModePref = true

  document.documentElement.classList.toggle("dark")
}
