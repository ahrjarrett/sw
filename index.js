const fetch = require("node-fetch")

// Variables:
const SPREADSHEET_URI = "https://docs.google.com/spreadsheets/d/1qBDiQVBcs3EAX0Y1ZaS7QxgjYCO7t4wnQxitsmkY3xo/edit#gid=0"
const column = "ad_id"
const row = 1

// Constants:
const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
const SPREADSHEET_ID = SPREADSHEET_URI.match(regex)[1]
const JSON_URI = `https://spreadsheets.google.com/feeds/list/${SPREADSHEET_ID}/od6/public/values?alt=json`

// Helpers:

/*** Helpers: ***/
const cleanTitle = title => title.replace(/[-_?\s]/g, "")
// makeColumn :: "column name" => "gsx$columnname"
const makeColumn = title => [title]
  .map(cleanTitle)
  .map(clean => `gsx$${clean}`)[0]


/*** Example Using Request: ***/
//request
//  .get(JSON_URI, (error, response, body) => {
//    const json = JSON.parse(body)
//    const rows = json.feed.entry
//
//    // Get 2nd row value at column "ad_id"
//    console.log(rows[1][makeColumn(column)]["$t"])
//  })


/*** Example Using Fetch & Async/Await ***/
const fetchJson = async uri => {
  const response = await fetch(JSON_URI)
  return await response.json()
}

const getValueAtCell = json => (row, column) => {
  const col = makeColumn(column)
  return json.feed.entry[row][col]["$t"]
}

fetchJson(JSON_URI)
  .then(json => {
    console.log(
      // Get 2nd row value at column "ad_id"
      getValueAtCell(json)(row, column)
    )
  })

