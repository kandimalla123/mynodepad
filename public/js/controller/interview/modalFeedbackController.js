var contrModule = angular.module('myNotePad');

contrModule.controller('ModalFeedbackCtrl', function ($scope, $modalInstance, feedback,$log) {
	  $log.debug('ModalFeedbackCtrl called');
	  $scope.feedback = feedback;
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});