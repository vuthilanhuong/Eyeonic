//                                 >>>>>>>>>>>>>>>>>>>User<<<<<<<<<<<<<<<<<<<   

app.controller("userCtrl",function($scope,$stateParams,$http){
	var idxPage = $stateParams.pageID;

	$scope.loadUser = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/members/' + '?page=' + idxPage
		}).then(function mySuccess(response){
    		console.log(response);
    		$scope.restored_data = response.data;
            console.log('Get thanh cong');
    	}, function myError(response) {
    		console.log('loi dang ky');
    	});
	    $scope.currentPage = idxPage;
	};

	$scope.edit = function(item){
		localStorage.editUser = JSON.stringify(item);
	};

	$scope.remove = function(item){ 
        $http({
			method: 'DELETE',
			url: 'http://localhost:3000/_api/v1/members/' + item._id
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Delete thanh cong');
            window.location.reload();
    	}, function myError(response) {
    		console.log('Delete that bai');
    	});   
    };
});

app.controller("addUserCtrl",function($scope,$http){
	$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	$scope.previewShow = true;

	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.img = response.data.secure_url;					
            console.log('thanh cong upload');
            $scope.previewShow = false;
            $scope.uploadErr = false
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    });
	};

	$scope.submitForm = function(){
		var data = $scope.sendData;
			data.gender = data.gender.value;
			data.avatarUrl = $scope.img;
			console.log(data);
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/members',
			data: data
		}).then(function mySuccess(response){
    		swal({
			  title: "Thành Công!",
			  text: " ",
			  icon: "success",
			  timer: 1000,
  			  buttons: false
			})
    	}, function myError(response) {
    		swal({
			  title: "Thất Bại!",
			  text: " ",
			  icon: "error",
			  timer: 1000,
  			  buttons: false
			})
    	}); 
	};

	$scope.resetForm = function(){
		$scope.previewShow = true
	};

	//Error messages
	$scope.userError = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/checkUser',
			data : $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			$scope.checkUser = true
    	}, function myError(response) {
    		$scope.checkUser = false
	    });
	};

	$scope.resetUser = function(){
		$scope.checkUser = false
	};

	$scope.confirmError = function(){
		if ($scope.confirmPassword == $scope.sendData.password) {
			$scope.checkConfirm = false;
		}else{
			$scope.checkConfirm = true;
		}			
	};

	$scope.resetConfirm = function(){
		$scope.checkConfirm = false
	};

	$scope.emailError = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/checkEmail',
			data: $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			$scope.checkEmail = true
    	}, function myError(response) {
    		$scope.checkEmail = false
	    });		
	};

	$scope.resetEmail = function(){
		$scope.checkEmail = false
	};

	$scope.birthDayError = function(){
		var today = new Date();
		var condition = today.setFullYear(today.getFullYear()-3);
		if ($scope.sendData.birthDay < condition) {
			$scope.checkBirthDay = false;
		}else{
			$scope.checkBirthDay = true;
		}	
	};
});

app.controller('editUserCtrl',function($scope,$http){

	$scope.loadFix = function(){
		$scope.detail_user = JSON.parse(localStorage.editUser);
		$scope.detail_user.birthDay = new Date($scope.detail_user.birthDay);
		$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	};

	$scope.submitFix = function(data){
		data.avatarUrl = $scope.img;
		$http({
			method: 'PUT',
			url: 'http://localhost:3000/_api/v1/members/' + data._id,
			data: data
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Update thanh cong');
    	}, function myError(response) {
    		console.log('Update loi');
    	});
	};

	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.detail_user.avatarUrl = response.data.secure_url;					
            console.log('thanh cong upload');
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    });
	};

});