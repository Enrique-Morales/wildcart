'use strict';

moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var usuariologeadoID = "";
        var tipoUsuarioID ="";
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setId: function (id) {
                usuariologeadoID = id;
            },
            getId : function(){
                return usuariologeadoID;
            },
            setTypeUserID: function (id) {
                tipoUsuarioID = id;
            },
            getTypeUserID : function(){
                return tipoUsuarioID;
            },
            setSessionActive: function () {
                isSessionActive = true;
            },
            setSessionInactive: function () {
                isSessionActive = false;
            }
        }

    }]);