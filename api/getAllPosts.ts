import GhostAPI from "@api"

export async function getAllPosts() {
  return await GhostAPI.posts
    .browse({
      include: "tags",
    })
    .catch(err => {
      throw new Error(err)
    })
}
