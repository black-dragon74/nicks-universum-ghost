import GhostAPI from "."

export async function getAllPosts() {
  return await GhostAPI.posts
    .browse({
      include: "tags",
      limit: "all",
    })
    .catch(err => {
      throw new Error(err)
    })
}
