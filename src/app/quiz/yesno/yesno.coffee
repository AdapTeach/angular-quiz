angular.module('quiz.yesno', [])

.directive('yesno', ->
  restrict: 'E'
  templateUrl: 'quiz/yesno/yesno.html'
  controller: 'YesNoCtrl'
  scope:
    assessment: '='
)

.controller('YesNoCtrl', ($scope) ->
  isCorrect = (answer) ->
    $scope.assessment.answer is answer

  isWrong = (answer) ->
    not isCorrect(answer)

  isSelected = (answer) ->
    $scope.selectedAnswer is answer

  $scope.confirmedAndCorrect = (answer) ->
    $scope.confirmed and isCorrect(answer)

  $scope.confirmedAndWrong = (answer) ->
    $scope.confirmed and isWrong(answer) and isSelected(answer)
)