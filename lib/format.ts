function dateFormat(dateString: Date | string): string {
  console.log(typeof dateString)
  if (dateString === "") {
    return "Empty Date String Provided."
  }
  const convertedString: string = JSON.stringify(dateString).slice(1, -1) // remove double quotes from dateString
  const [year, month, time]: string[] = convertedString.split("-")
  const day: string = time.split("T")[0]
  let formatedDateString: string = `${day}-${month}-${year}`
  return formatedDateString
}
export { dateFormat }
