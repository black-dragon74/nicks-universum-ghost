const getDateFromDateString = (dateString: string): string => {
  return new Date(dateString)
    .toUTCString()
    .split(" ")
    .slice(0, 4)
    .join(" ")
    .split(" ")
    .slice(1, 4)
    .join("-")
}

export default getDateFromDateString
