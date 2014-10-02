angular.module('quiz', [
  'hljs'
  'quiz.mcq'
  'quiz.number'
  'quiz.yesno'
])

.factory('Quiz', ->
  items: []
)

.controller('QuizCtrl', ($http, $location, Quiz) ->
  this.Quiz = Quiz
  urlArray = $location.absUrl().split('quizId=')
  quizId = urlArray[urlArray.length - 1]
  $http.get('static/' + quizId + '.json')
  .success (result) ->
    Quiz.items = result.items
)