"use strict";

require.config({
    paths: {
        angular: "bower_components/angular/angular",
        angularAnimate: "bower_components/angular-animate/angular-animate",
        angularRoute: "bower_components/angular-route/angular-route",
        angularMocks: "bower_components/angular-mocks/angular-mocks",
        howler: "bower_components/howler/howler"
    },
    shim: {
        angular: { exports: "angular" },
        angularAnimate: ["angular"],
        angularRoute: ["angular"],
        angularMocks: ["angular"]
    }
});

require(["angular", "app"], function (angular) {

    angular.element(document).ready(function () {

        try {
            angular.bootstrap(document, ['Applaudio']);
        } catch (e) {
            console.error(e.stack || e.message || e);
        }

    });
});