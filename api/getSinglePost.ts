import GhostAPI from "."

const getSinglePost = async (slug: string) => {
  return await GhostAPI.posts
    .read({
      slug,
    })
    .catch(err => {
      console.error(err)
    })
}

export { getSinglePost }
