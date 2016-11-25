const API_ROOT = `https://toronto-bikemap.herokuapp.com`

export default class StationsService {
  constructor ($http) {
    this.$http = $http
  }

  getData () {
    const url = `${API_ROOT}/stations`

    return  this.$http({ method: 'get', url })
  }
}

StationsService.$inject = ['$http']