const request = require("request")
const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/

const SPREADSHEET_URI = "https://docs.google.com/spreadsheets/d/1qBDiQVBcs3EAX0Y1ZaS7QxgjYCO7t4wnQxitsmkY3xo/edit#gid=0"
const SPREADSHEET_ID = SPREADSHEET_URI.match(regex)[1]
const JSON_URI = `https://spreadsheets.google.com/feeds/list/${SPREADSHEET_ID}/od6/public/values?alt=json`

console.log("SPREADSHEET_URI", SPREADSHEET_URI, "\n")
console.log("JSON_URI", JSON_URI, "\n")
console.log("SPREADSHEET_ID", SPREADSHEET_ID, "\n")

request(JSON_URI, function (error, response, body) {
  console.log('error:', error) // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
  console.log('body:', body) // Print the HTML for the Google homepage.
})

