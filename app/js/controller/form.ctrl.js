'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("FormController", function FormController($scope, $state, $http, AnswerService, quiz) {

        //TODO: treat unexpected situations with toastr
        //      the functions (send, select and sendNegar) haven't been tested yet

        var self = this;
        var formCtrl = this;

        self.quiz = quiz.data;

        formCtrl.radio_question = {};
        formCtrl.text_question = {};
        formCtrl.token = $state.params.token;
        formCtrl.curso = $state.params.curso;
        formCtrl.visible = {};
        formCtrl.count = 0;
        formCtrl.actual_question = self.quiz[formCtrl.count];
        formCtrl.determinateValue = 0;

        formCtrl.next = function () {

            if (formCtrl.count < self.quiz.length - 2) {
                formCtrl.count += 2;
                formCtrl.actual_question = self.quiz[formCtrl.count];
                self.calcPercentage(formCtrl.count);
                
            } else {
                console.log("last question");
            }
        };

        formCtrl.previous = function () {

            if (formCtrl.count > 0) {
                formCtrl.count -= 2;
                formCtrl.actual_question = self.quiz[formCtrl.count];
                self.calcPercentage(formCtrl.count);
                

            } else {
                console.log("first question");
            }

        };

        self.calcPercentage = function (count) {
            formCtrl.determinateValue = count / (self.quiz.length - 2)*100;
        };

        self.toggle = function (q, id) {
            q[id] = !q[id];
        };

        self.sendAnswer = function (token) {
            AnswerService.submitAnswers(token,
                self.text_question, self.radio_question)
                .then(function successCallback(response) {
                    ngToast.create(response.data);
                }, function errorCallback(response) {
                    ngToast.create({
                        className: 'warning',
                        content: response.status + " (" + response.statusText + "): " + response.data
                    });
                });
        };

        self.sendNegar = function (token) {
            AnswerService.submitNoAnswers(token).then(function successCallback(response) {
                ngToast.create(response.data);
            }, function errorCallback(response) {
                ngToast.create({
                    className: 'warning',
                    content: response.status + " (" + response.statusText + "): " + response.data
                });
            });
        };

        self.selectAll = function (value) {
            self.radio_question = self.radio_question.map(() => {
                return value;
            });
        };

    });
})();