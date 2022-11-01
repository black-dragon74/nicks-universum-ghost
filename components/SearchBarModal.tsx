import Modal, { ModalProps } from "@ui/Modal"
import SearchCardRow from "@ui/SearchCardRow"
import { SearchContext } from "contexts/SearchContext"
import { FC, useContext, useDeferredValue, useState } from "react"

interface SearchBarModalProps extends ModalProps {}

const SearchBarModal: FC<SearchBarModalProps> = ({ isOpen, ...props }) => {
  const [postName, setPostName] = useState("")
  const deferredPostName = useDeferredValue(postName)

  const a = useContext(SearchContext)

  const filteredPosts = (() => {
    if (deferredPostName === "") return []

    return a.filter(p =>
      p.title.toLowerCase().includes(deferredPostName.toLowerCase())
    )
  })()

  return (
    <Modal isOpen={isOpen} onRequestClose={props?.onRequestClose}>
      <div className="flex flex-col gap-2">
        <input
          value={postName}
          onChange={e => setPostName(e.target.value)}
          className="bg-transparent placeholder:text-gray-400 text-black dark:text-gray-200 font-medium border-b border-b-gray-400 focus:border-b-gray-600 dark:border-b-gray-500 dark:focus:border-b-gray-400 transition-colors duration-300 ease-in-out w-full outline-none mb-2"
          type="text"
          placeholder="Search for posts... "
          ref={self => self?.focus()}
        />

        {filteredPosts.map(p => (
          <SearchCardRow
            key={p.slug}
            {...p}
            close={() => props.onRequestClose(null)}
          />
        ))}
      </div>
    </Modal>
  )
}

export default SearchBarModal
