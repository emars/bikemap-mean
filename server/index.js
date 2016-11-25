const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const fetchStations = require('./lib/stations').fetchStations

const app = express()

/* middleware */
app.use(cors())

/* returns the stations */
app.get('/stations', (req, res) => {
  fetchStations()
    .then((stations) => {
      res.json(stations)
    })
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
