wildcart.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        
        $routeProvider.when('/cart/show', {templateUrl: 'js/app/cart/show.html', controller: 'cartShowController'});
        
        $routeProvider.when('/tipousuario/plist', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController'});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController'});
        $routeProvider.when('/tipousuario/create', {templateUrl: 'js/app/tipousuario/create.html', controller: 'tipousuarioCreateController'});

        $routeProvider.when('/producto/plist', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController'});
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController'});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController'});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController'});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveController'});
        $routeProvider.when('/producto/create', {templateUrl: 'js/app/producto/create.html', controller: 'productoCreateController'});

        $routeProvider.when('/factura/plist', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController'});
        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController'});
        $routeProvider.when('/factura/view/:id?', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController'});
        $routeProvider.when('/factura/edit/:id?', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController'});
        $routeProvider.when('/factura/remove/:id?', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController'});
        $routeProvider.when('/factura/create', {templateUrl: 'js/app/factura/create.html', controller: 'facturaCreateController'});        
        $routeProvider.when('/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistlinea.html', controller: 'facturaPlistLineaController'});

        $routeProvider.when('/linea/plist', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController'});
        $routeProvider.when('/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController'});
        $routeProvider.when('/linea/view/:id?', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController'});
        $routeProvider.when('/linea/edit/:id?', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController'});
        $routeProvider.when('/linea/remove/:id?', {templateUrl: 'js/app/linea/remove.html', controller: 'lineaRemoveController'});
        $routeProvider.when('/linea/create', {templateUrl: 'js/app/linea/create.html', controller: 'lineaCreateController'});

        $routeProvider.when('/usuario/plist', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController'});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController'});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController'});
        $routeProvider.when('/usuario/create', {templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateController'});
        $routeProvider.when('/usuario/login', {templateUrl: 'js/app/usuario/login.html', controller: 'usuarioLoginController'});
        $routeProvider.when('/usuario/logout', {templateUrl: 'js/app/usuario/logout.html', controller: 'usuarioLogoutController'});        
        $routeProvider.when('/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plistfactura.html', controller: 'usuarioPlistFacturaController'});

        $routeProvider.when('/tipoproducto/plist', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController'});
        $routeProvider.when('/tipoproducto/edit/:id?', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditController'});
        $routeProvider.when('/tipoproducto/remove/:id?', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveController'});
        $routeProvider.when('/tipoproducto/create', {templateUrl: 'js/app/tipoproducto/create.html', controller: 'tipoproductoCreateController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);