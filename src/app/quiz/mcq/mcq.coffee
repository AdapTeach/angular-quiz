angular.module('quiz.mcq', [])

.directive('mcq', ->
  restrict: 'E'
  templateUrl: 'quiz/mcq/mcq.html'
  controller: 'McqCtrl'
  scope:
    assessment: '='
)

.controller('McqCtrl', ($scope) ->
  $scope.isSimpleQuestion = ->
    if angular.isString($scope.assessment.question)
      return true
    if angular.isString($scope.assessment.question.text)
      return true
    else
      return false

  $scope.getQuestionText = ->
    if angular.isString($scope.assessment.question)
      return $scope.assessment.question
    else
      return $scope.assessment.question.text

  $scope.isRadio = ->
    countCorrectAnswers() is 1

  $scope.isCheckbox = ->
    countCorrectAnswers() > 1

  countCorrectAnswers = ->
    correctAnswers = 0
    for answer in $scope.assessment.answers
      if answer.isCorrect then correctAnswers++
    correctAnswers

  $scope.confirm = ->
    $scope.confirmed = true
    if $scope.selectedAnswer?.isCorrect?
      console.log 'Correct'
    else
      console.log 'Fail'

  $scope.showAnswerAsCorrect = (answer) ->
    answer.isCorrect? && $scope.confirmed?

  isSelected = (answer) ->
    $scope.assessmentForm.selectedAnswer is answer

  $scope.showAnswerAsWrong = (answer) ->
    not answer.isCorrect? && $scope.confirmed? && isSelected(answer)
)