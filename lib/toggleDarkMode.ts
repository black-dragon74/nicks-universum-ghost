export default function toggleDarkMode() {
  // Exit if window is undefined
  if (typeof window === "undefined") return

  //TODO: Fix this
  //   window.userHasCustomDarkModePref = true

  document.documentElement.classList.toggle("dark")
}
