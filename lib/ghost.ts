import {
  Author,
  Pagination,
  SettingsResponse,
  Tag,
} from "@tryghost/content-api"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import { NextImage } from "types/NextImage"
import { ProcessEnvProps } from "types/ProcessEnvProps"

export interface NavItem {
  url: string
  label: string
}

export interface BrowseResults<T> extends Array<T> {
  meta: { pagination: Pagination }
}

export interface GhostSettings extends SettingsResponse {
  processEnv: ProcessEnvProps
  secondary_navigation?: NavItem[]
  iconImage?: NextImage
  logoImage?: NextImage
  coverImage?: NextImage
}

export interface GhostTag extends Tag {
  featureImage?: NextImage
}

export interface GhostAuthor extends Author {
  profileImage?: NextImage
}

export interface GhostPostsOrPages extends BrowseResults<GhostPostOrPage> {}
export interface GhostTags extends BrowseResults<GhostTag> {}
export interface GhostAuthors extends BrowseResults<GhostAuthor> {}
