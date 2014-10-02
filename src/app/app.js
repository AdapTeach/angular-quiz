angular.module('app', [
    'ui.utils',
    'ui.bootstrap',
    'quiz',
    'questions'
])

    .config(function ($locationProvider) {
        // $locationProvider.html5Mode(true);
    });