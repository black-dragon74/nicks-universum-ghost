import GhostAPI from "@api"

const getAllSettings = async () => {
  const settings = await GhostAPI.settings.browse()
  settings.url = settings?.url?.replace(/\/$/, ``)

  return settings
}

export { getAllSettings }
