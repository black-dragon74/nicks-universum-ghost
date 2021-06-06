import { BrowseResults, GhostAuthors, GhostTags } from "@lib/ghost"
import { getImageDimensions, normalizedImageURL } from "@lib/images"
import { Author, PostOrPage, PostsOrPages, Tag } from "@tryghost/content-api"
import { NextImage } from "types/NextImage"

const createNextImage = async (
  url?: string | null
): Promise<NextImage | undefined> => {
  if (!url) return undefined

  const normalizedURL = await normalizedImageURL(url)
  const dimensions = await getImageDimensions(url)

  return (dimensions && { url: normalizedURL, dimensions }) || undefined
}

const createNextFeatureImages = async (
  nodes: BrowseResults<Tag | PostOrPage>
): Promise<GhostTags | PostsOrPages> => {
  const { meta } = nodes

  const images = await Promise.all(
    nodes.map(node => createNextImage(node.feature_image))
  )
  const results = nodes.map((node, i) => ({
    ...node,
    ...(images[i] && { featureImage: images[i] }),
  }))

  return Object.assign(results, { meta })
}

const createNextProfileImages = async (
  nodes: BrowseResults<Author>
): Promise<GhostAuthors> => {
  const { meta } = nodes
  const images = await Promise.all(
    nodes.map(node => createNextImage(node.profile_image))
  )
  const results = nodes.map((node, i) => ({
    ...node,
    ...(images[i] && { profileImage: images[i] }),
  }))

  return Object.assign(results, { meta })
}

const createNextProfileImagesFromAuthors = async (
  nodes: Author[] | undefined
): Promise<Author[] | undefined> => {
  if (!nodes) return undefined
  const images = await Promise.all(
    nodes.map(node => createNextImage(node.profile_image))
  )

  return nodes.map((node, i) => ({
    ...node,
    ...(images[i] && { profileImage: images[i] }),
  }))
}

const createNextProfileImagesFromPosts = async (
  nodes: BrowseResults<PostOrPage>
): Promise<PostsOrPages> => {
  const { meta } = nodes

  const authors = await Promise.all(
    nodes.map(node => createNextProfileImagesFromAuthors(node.authors))
  )

  const results = nodes.map((node, i) => ({
    ...node,
    ...(authors[i] && { authors: authors[i] }),
  }))

  return Object.assign(results, { meta })
}

export {
  createNextImage,
  createNextFeatureImages,
  createNextProfileImages,
  createNextProfileImagesFromAuthors,
  createNextProfileImagesFromPosts,
}
