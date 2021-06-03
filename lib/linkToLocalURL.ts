const linkToLocalURL = (remoteURL: string) => {
  return remoteURL.replace(process.env.API_URL, "")
}

export default linkToLocalURL
