"use strict";

console.log("APPLAUDIO");

require.config({
    paths: {
        angular: "../bower_components/angular/angular",
        angularAnimate: "../bower_components/angular-animate/angular-animate",
        angularRoute: "../bower_components/angular-route/angular-route",
        angularMocks: "../bower_components/angular-mocks/angular-mocks"
    },
    shim: {
        angular: { exports: "angular" },
        angularAnimate: ["angular"],
        angularRoute: ["angular"],
        angularMocks: ["angular"]
    }
});

require(["angular", "app"], function (angular) {

    console.log("Resuming angular bootstrap");

    angular.element(document).ready(function () {
        console.log("document ready. Bootstrapping Angular");
        angular.bootstrap(document, ["applaudio"]);
    });
});