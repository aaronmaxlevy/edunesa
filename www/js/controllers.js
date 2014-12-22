angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $cordovaDialogs, $location, $window) {
  // Form data for the login modal
  // $scope.loginData = {};
  $scope.backSwipe = function() {
    $location.path("/#/home");
  };

$scope.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();
  $scope.starterTasks = [
    {
      "title": "Task 1",
      "isDone": false,
      "howLong": "1 day",
      "taskId": $scope.guid()
    },
    {
      "title": "Task 2",
      "isDone": true,
      "howLong": "2 days",
      "taskId": $scope.guid()
    }
  ];

  $scope.daysContext = [
    {"dayCount" : "1 day"},
    {"dayCount" : "2 days"},
    {"dayCount" : "3 days"}
  ];

  $scope.fetchTasks = function(){
    var a = JSON.parse($window.localStorage['tasks'] || '[]');
    return a;
  };

  $scope.tasks = $scope.fetchTasks();

  $scope.starterStopper = [
    {
      "stopper": "",
      "reasonNot": ""
    }
  ];

  $scope.fetchStoppers = function(){
    var a = JSON.parse($window.localStorage['stoppers'] || JSON.stringify($scope.starterStopper));
    return a;
  };

  $scope.stoppers = $scope.fetchStoppers();

  $scope.currentStopper = $scope.stoppers[0];
  $scope.currentStopperIndex = 0;

  $scope.isNotEmpty = function(){
    if($scope.fetchTasks().length === 0){
      // console.log($scope.fetchTasks().length);
      return false;
    }
    else{
      // console.log($scope.fetchTasks().length);
      return true;
    }
  };

   // $scope.getTaskByIndex = function(index) {
   //    return
   //    throw "Couldn't find object with id: " + id;
   //    };


  // $scope.setTasks = function(){
  //   $window.localStorage['tasks'] = JSON.stringify($scope.starterTasks);
  //   console.log($window.localStorage['tasks']);
  // };

  $scope.updateTaskStorage = function(){
    $window.localStorage['tasks'] = JSON.stringify($scope.tasks);
  };

  $scope.updateStopperStorage = function(){
    $window.localStorage['stoppers'] = JSON.stringify($scope.stoppers);
  };

  $scope.setDone = function($taskId){
    // console.log($taskId);
    var currentTask = function findById() {
      for (var i = 0; i < $scope.tasks.length; i++) {
        if ($scope.tasks[i].taskId === $taskId) {
          return $scope.tasks[i];
        }
      }
      throw "Couldn't find object with id: " + id;
      };
      if(currentTask().isDone == true){
        currentTask().isDone = false;
      }
      else{
        currentTask().isDone = true;
      }
      $scope.updateTaskStorage();
  };

  $scope.addTask = function ($taskName){
    // console.log($taskName);
    var currentTasks = $scope.tasks;
    var newTask = {
      "title": $taskName,
      "isDone": false,
      "howLong": "1 day",
      "taskId": $scope.guid()
    };
    currentTasks.push(newTask);
    // console.log(currentTasks);
    $window.localStorage['tasks'] = JSON.stringify(currentTasks);
  };

  $scope.currentTask = $scope.tasks[0];
  $scope.currentTaskIndex = 0;

  $scope.nextTask = function(){
    // console.log($scope.currentTask.howLong);
    $scope.updateTaskStorage();
    if(($scope.currentTaskIndex + 1) < $scope.tasks.length){
      $scope.currentTask = $scope.tasks[($scope.currentTaskIndex + 1)];
      $scope.currentTaskIndex += 1;
    }
    else{
      $scope.currentTask = $scope.tasks[0];
      $scope.currentTaskIndex = 0;
    }
  };

  $scope.nextStopper = function(){
    if(($scope.currentStopper.stopper == "") || ($scope.currentStopper.reasonNot == "")){
        // console.log("Incomplete Input");
        $cordovaDialogs.alert("Please complete all fields.", "Incomplete Input", "OK");
        return;
      }
    $scope.updateStopperStorage();
    if(($scope.currentStopperIndex + 1) == $scope.stoppers.length){
      $scope.stoppers.push(JSON.parse(JSON.stringify($scope.starterStopper[0])));
      $scope.currentStopper = $scope.stoppers[($scope.currentStopperIndex + 1)];
      $scope.currentStopperIndex += 1;
    }
    else if(($scope.currentStopperIndex + 1) < $scope.stoppers.length){
      // console.log("def");
      $scope.currentStopper = $scope.stoppers[($scope.currentStopperIndex + 1)];
      $scope.currentStopperIndex += 1;
    }
  };


});
