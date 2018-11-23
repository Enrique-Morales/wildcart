'use strict';

moduleFactura.controller('facturaEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.myDate = new Date();
        $scope.ob = "factura";
        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
            $scope.usuariologeadoID = sessionService.getId();
        }

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoFactura = response.data.message;
        }, function (response) {
            $scope.ajaxDatoFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoFactura.id,
                fecha: null,
                iva: $scope.ajaxDatoFactura.iva,
                id_usuario: $scope.ajaxDatoFactura.obj_Usuario.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob + '&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoFactura = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };

        $scope.isActive = toolService.isActive;
        
        $scope.usuarioRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if (consulta) {                
                $http({
                    method: 'GET',
                    url: 'json?ob=usuario&op=get&id=' + $scope.ajaxDatoFactura.obj_Usuario.id
                }).then(function (response) {
                    form.userForm.obj_Usuario.$setValidity('valid', true);
                    $scope.ajaxDatoFactura.obj_Usuario = response.data.message;
                }, function (response) {
                    form.userForm.obj_Usuario.$setValidity('valid', false);
                    $scope.ajaxDatoFactura.obj_Usuario.nombre = "Error al acceder al tipo de usuario";
                });
            } else {
                form.userForm.obj_Usuario.$setValidity('valid', true);
            }
        };

    }]);