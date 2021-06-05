import GhostAPI from "@api"

const getSinglePost = async (slug: string) => {
  return await GhostAPI.posts
    .read({
      slug,
    })
    .catch(err => {
      throw new Error(err)
    })
}

export { getSinglePost }
