function dateFormat(dateString) {
  console.log(dateString)

  if (dateString === null || dateString === undefined) {
    return
  }
  if (dateString === "") {
    return
  }
  const convertedString = JSON.stringify(dateString).slice(1, -1) // remove double quotes from dateString
  const [year, month, time] = convertedString.split("-")
  const day = time.split("T")[0]
  let formatedDateString = `${day}-${month}-${year}`
  return formatedDateString
}
export { dateFormat }
