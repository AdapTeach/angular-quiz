angular.module('quiz.number', [])

.directive('number', ->
  restrict: 'E'
  templateUrl: 'quiz/number/number.html'
  controller: 'NumberCtrl'
  scope:
    assessment: '='
)

.controller('NumberCtrl', ($scope) ->
  isCorrect = (answer) ->
    answer + '' is $scope.userAnswer?.trim()

  isWrong = (answer) ->
    not isCorrect(answer)

  $scope.confirmedAndCorrect = (answer) ->
    isCorrect(answer) and $scope.confirmed?

  $scope.confirmedAndWrong = (answer) ->
    isWrong(answer) and $scope.confirmed?
)