const request = require('request')
const xmlToJSON = require('xml2js')

const BIKE_DATA_URL = 'http://feeds.bikesharetoronto.com/stations/stations.xml'

function fetchStations (callback) {
  return new Promise((resolve, reject) => {
    request.get(BIKE_DATA_URL, (err, res, body) => {
      if (err) {
        reject(err)
      }

      convertXMLToJSON(body, (err, json) => {
        if (err) {
          reject(err)
        }

        const stations = parseStations(json)

        resolve(stations)
      })
    })
  })
}

function convertXMLToJSON (xml, callback) {
  xmlToJSON.parseString(xml, callback)
}

function parseStations (json) {
  const stations = []

  json.stations.station.forEach((station) => {
    const id = parseInt(station.id[0])
    const numBikes = parseInt(station.nbBikes[0])
    const capacity = numBikes +
      parseInt(station.nbEmptyDocks[0])
    const coords = [
      parseFloat(station.lat[0]),
      parseFloat(station.long[0])
    ]

    const data = {
      capacity,
      numBikes,
      coords,
      id,
      name: station.name[0]
    }

    stations.push(data)
  })

  return stations
}

module.exports = {
  fetchStations
}
