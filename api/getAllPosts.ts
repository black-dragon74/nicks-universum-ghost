import GhostAPI from "."

export async function getAllPosts() {
  return await GhostAPI.posts
    .browse({
      include: "tags",
    })
    .catch(err => {
      throw new Error(err)
    })
}
