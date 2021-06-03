import { getAllPosts } from "."

const getAllPostsPath = async () => {
  const posts = await getAllPosts()

  return posts.map(post => post.slug.trim())
}

export { getAllPostsPath }
