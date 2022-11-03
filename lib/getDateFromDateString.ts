const getDateFromDateString = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default getDateFromDateString
