'user strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("AnswerFormController", ['$scope', '$http', '$route', 'ngToast', 'answerAPI', 'quiz',
        function ($scope, $http, $route, ngToast, answerAPI, quiz) {

            $scope.quiz = quiz;
            $scope.radio_question = {};
            $scope.text_question = {};
            $scope.token = $route.current.params.token;
            $scope.curso = $route.current.params.curso;
            $scope.visible = {};

            var begin = function () {

            };

            $scope.toggle = function (q, id) {
                q[id] = !q[id];
            };

            $scope.sendAnswer = function (token) {
                answerAPI.submitAnswers(token,
                    $scope.text_question, $scope.radio_question)
                    .then(function successCallback(response) {
                        ngToast.create(response.data);
                    }, function errorCallback(response) {
                        ngToast.create({
                            className: 'warning',
                            content: response.status + " (" + response.statusText + "): " + response.data
                        });
                    });
            };

            $scope.sendNegar = function (token) {
                answerAPI.submitNoAnswers(token).then(function successCallback(response) {
                    ngToast.create(response.data);
                }, function errorCallback(response) {
                    ngToast.create({
                        className: 'warning',
                        content: response.status + " (" + response.statusText + "): " + response.data
                    });
                });
            };

            $scope.selectAll = function (value) {
                for (var id in $scope.radio_question) {
                    $scope.radio_question[id] = value;
                }
            };

            $('.collapse').collapse('hide');

            begin();

        }])
})();


