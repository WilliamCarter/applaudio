"use strict";

require.config({
    paths: {
        angular: "../bower_components/angular/angular",
        angularAnimate: "../bower_components/angular-animate/angular-animate",
        angularRoute: "../bower_components/angular-route/angular-route",
        angularMocks: "../bower_components/angular-mocks/angular-mocks",
        components: "../components"
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

        try {
            // Wrap this call to try/catch
            angular.bootstrap(document, ['applaudio']);
        } catch (e) {
            console.error(e.stack || e.message || e);
        }

    });
});