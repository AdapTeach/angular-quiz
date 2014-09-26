angular.module('quiz', [
  'hljs'
  'quiz.mcq'
  'quiz.number'
  'quiz.yesno'
])

.controller('QuizCtrl', ($scope, Items) ->
  $scope.items = Items
)
#
#.controller('AssessmentFormCtrl', ($scope) ->
#  $scope.confirm = ->
#    $scope.confirmed = true
#    if $scope.assessmentForm.selectedAnswer?.isCorrect?
#      console.log 'Correct'
#    else
#      console.log 'Fail'
#
#  $scope.showAnswerAsCorrect = (answer) ->
#    answer.isCorrect? && $scope.confirmed?
#
#  $scope.showAnswerAsWrong = (answer) ->
#    not answer.isCorrect? && $scope.confirmed?
#)

.config(($stateProvider) ->
  $stateProvider.state('quiz', {
    url: '/quiz'
    views:
      main:
        templateUrl: 'quiz/quiz.html'
  })
)

