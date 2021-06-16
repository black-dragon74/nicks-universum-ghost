import { useEffect, useState } from "react"

const useActiveHash = (
  itemIDs: string[],
  rootMargin: string | undefined = undefined
) => {
  const [activeElement, setActiveElement] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      elems => {
        elems.forEach(elem => {
          if (elem.isIntersecting) {
            setActiveElement(elem.target.id)
          }
        })
      },
      {
        rootMargin: rootMargin || "0% 0% -90% 0%",
      }
    )

    // Helper func to observe/unobserve an elem
    const trigger = (id: string, action: "observe" | "unobserve") => {
      const ele = document.getElementById(id)
      if (ele && typeof ele === "object") {
        observer[action](ele)
      }
    }

    // Observe all items for intersection
    itemIDs.forEach(itemID => trigger(itemID, "observe"))

    // Ubobserve while disposing
    return () => itemIDs.forEach(item => trigger(item, "unobserve"))
  }, [itemIDs, rootMargin, setActiveElement])

  return activeElement
}

export { useActiveHash }
