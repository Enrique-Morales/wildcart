'use strict'

moduleCart.controller('cartShowController', ['$scope', '$http', '$location', 'toolService', '$routeParams', "sessionService",
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {

        $scope.comprado = false;

        $scope.ob = "cart";

        $scope.totalCart = 0;

        $scope.precioTotal = 0;
        
        var carrito;


        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
            $scope.usuariologeadoID = sessionService.getId();
        }


//        $scope.resetOrder = function () {
//            $location.url($scope.ob + "/plist/" + $scope.rpp + "/1");
//            $scope.activar = "false";
//        };
//
//
//        $scope.ordena = function (order, align) {
//            if ($scope.orderURLServidor === "") {
//                $scope.orderURLServidor = "&order=" + order + "," + align;
//                $scope.orderURLCliente = order + "," + align;
//            } else {
//                $scope.orderURLServidor += "-" + order + "," + align;
//                $scope.orderURLCliente += "-" + order + "," + align;
//            }
//
//
//            ;
//            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
//        };

        //getcount
//        $http({
//            method: 'GET',
//            url: '/json?ob=' + $scope.ob + '&op=show'
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxDataUsuariosNumber = response.data.message;
//            $scope.totalPages = Math.ceil($scope.ajaxDataUsuariosNumber / $scope.rpp);
//            if ($scope.page > $scope.totalPages) {
//                $scope.page = $scope.totalPages;
//                $scope.update();
//            }
//            pagination2();
//        }, function (response) {
//            $scope.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });

        $http({
            method: 'GET',
            header: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            url: '/json?ob=' + $scope.ob + '&op=show'
        }).then(function (response) {
            $scope.status = response.status;
            if (response.data.message !== "Carrito vacio") {
                $scope.ajaxDataUsuarios = response.data.message;
//                carrito = response.data.message;
                carrito = JSON.parse(JSON.stringify( response.data.message ));
                $scope.totalCart = response.data.message.length;
                var contador = 0;
                $scope.ajaxDataUsuarios.forEach(function (element) {

                    $scope.precioTotal += element.cantidad * element.obj_producto.precio;
//                    carrito[contador++]=parseInt(element);

                });
            }

        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });



//        $scope.update = function () {
//            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
//        };

        //paginacion neighbourhood
//        function pagination2() {
//            $scope.list2 = [];
//            $scope.neighborhood = 1;
//            for (var i = 1; i <= $scope.totalPages; i++) {
//                if (i === $scope.page) {
//                    $scope.list2.push(i);
//                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
//                    $scope.list2.push(i);
//                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
//                    $scope.list2.push(i);
//                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
//                    if ($scope.page >= 4) {
//                        $scope.list2.push("...");
//                    }
//                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
//                    if ($scope.page <= $scope.totalPages - 3) {
//                        $scope.list2.push("...");
//                    }
//                }
//            }
//        }
//        ;

//        $scope.validar = function (val, existencias, id) {
//            var diferencia;
//            if (val == undefined) {
//
//                var sQuery = "#" + id + "cant";
//                $(sQuery).val(existencias);
//                $scope.ajaxDataUsuarios.forEach(function (element) {
//                    if (element.obj_producto.id == id) {
//                        diferencia = 1 - element.cantidad;
//
//                        element.cantidad = 1;
//                        $scope.precioTotal += diferencia * element.obj_producto.precio;
//                    }
//                });
//            } else {
//                $scope.ajaxDataUsuarios.forEach(function (element) {
//                    if (element.obj_producto.id == id) {
//                        diferencia = val - element.cantidad;
//                        element.cantidad=val;
//                        $scope.precioTotal += diferencia * element.obj_producto.precio;
//                    }
//                });
//            }
//
//        }

        $scope.validarCantidad = function (val, existencias, id) {
            var diferencia;
            var cantidadFinal;
            if (val == undefined) {
                var sQuery = "#" + id + "cant";
                $(sQuery).val(existencias);
                $scope.ajaxDataUsuarios.forEach(function (element) {
                    if (element.obj_producto.id == id) {
                        diferencia = 1 - element.cantidad;
                        cantidadFinal= 1;
                        element.cantidad = 1;
                        $scope.precioTotal += diferencia * element.obj_producto.precio;
                    }
                });
            } else {
                $scope.ajaxDataUsuarios.forEach(function (element) {
                    if (element.obj_producto.id == id) {
                        diferencia = val - element.cantidad;
                        cantidadFinal= val;
                        element.cantidad = val;
                        $scope.precioTotal += diferencia * element.obj_producto.precio;
                    }
                });
            }
            
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: '/json?ob=' + $scope.ob + '&op=update&prod=' + id + '&cant=' + cantidadFinal
            }).then(function (response) {
                $scope.status = response.status;

            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
            
        }

        $scope.eliminar = function (id, precio) {

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: '/json?ob=' + $scope.ob + '&op=reduce&prod=' + id
            }).then(function (response) {
                $scope.status = response.status;

                $scope.ajaxDataUsuarios = response.data.message;

                $scope.precioTotal -= precio;

                $location.url('cart/show');

            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });

        }

        $scope.buy = function () {

//            $scope.ajaxDataUsuarios.forEach(function (element) {
//
//                var sQuery = "#" + element.obj_producto.id + "cant";
//                element.cantidad = $(sQuery).val();
//
//            });
//
//            carrito.forEach(function (element) {
//
//                var sQuery = "#" + element.obj_producto.id + "cant";
//                var cantidadInput = $(sQuery).val();
//
//                if (element.cantidad != cantidadInput) {
//
//                $http({
//                method: 'GET',
//                header: {
//                    'Content-Type': 'application/json;charset=utf-8'
//                },
//                url: '/json?ob=' + $scope.ob + '&op=update&prod=' + element.obj_producto.id + '&cant=' + cantidadInput
//            }).then(function (response) {
//                $scope.status = response.status;
//
//            }, function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
//            });
//
//                }
//
//            });

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: '/json?ob=' + $scope.ob + '&op=buy'
            }).then(function (response) {
                $scope.status = response.status;

                $scope.comprado = true;


            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });


        }

        $scope.isActive = toolService.isActive;
    }



]);