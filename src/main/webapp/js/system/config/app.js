'use strict'

var wildcart = angular.module('MyApp', [
    'ngRoute',
    'services',
    'commonControllers',
    'tipousuarioControllers',
    'usuarioControllers',
    'productoControllers',
    'tipoproductoControllers',
    'facturaControllers',
    'lineaControllers',
    'cartControllers',
    'components'
]);


var moduleCommon = angular.module ('commonControllers',[]);
var moduleService = angular.module ('services',[]);
var moduleTipousuario = angular.module ('tipousuarioControllers',[]);
var moduleComponent = angular.module ('components',[]);
var moduleUsuario = angular.module ('usuarioControllers',[]);
var moduleProducto = angular.module ('productoControllers',[]);
var moduleTipoproducto = angular.module ('tipoproductoControllers',[]);
var moduleFactura = angular.module ('facturaControllers',[]);
var moduleLinea = angular.module ('lineaControllers',[]);
var moduleCart = angular.module('cartControllers',[]);