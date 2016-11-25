const { fetchStations } = require('../lib/stations')
const { expect } = require('chai')

describe('stations', function () {
  it('should return a list of stations', function (done) {
    fetchStations()
      .then((stations) => {
        expect(stations).to.be.an('array')

        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
