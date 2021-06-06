import GhostAPI from "@api"
import { GhostSettings } from "@lib/ghost"
import ProcessedENV from "@lib/processEnv"
import { createNextImage } from "./helpers"

const getAllSettings = async (): Promise<GhostSettings> => {
  const settings = await GhostAPI.settings.browse()
  settings.url = settings?.url?.replace(/\/$/, ``)

  const iconImage = await createNextImage(settings.icon)
  const logoImage = await createNextImage(settings.logo)
  const coverImage = await createNextImage(settings.cover_image)

  return {
    processEnv: ProcessedENV,
    ...settings,
    ...(iconImage && { iconImage }),
    ...(logoImage && { logoImage }),
    ...(coverImage && { coverImage }),
  }
}

export { getAllSettings }
