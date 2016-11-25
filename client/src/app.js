// main file

import angular from 'angular'

import StationsService from './services/stations.service'
import MainController from './controllers/main.controller'

angular.module('bikemap', [])
  .service('StationsService', StationsService)
  .controller('MainController', MainController)

