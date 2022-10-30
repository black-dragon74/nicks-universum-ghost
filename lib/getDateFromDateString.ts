const getDateFromDateString = (dateString: string): string => {
    // convert dateString to UTC time and then return the date as dd-mm-yyyy
    return new Date(dateString)
      .toUTCString()
      .split(" ")
      .slice(0, 4)
      .join(" ")
      .split(" ")
      .slice(1, 4)
      .join("-");
  };
  
  export default getDateFromDateString;
  