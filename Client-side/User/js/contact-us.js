function validateUser(){
	var user = document.getElementById("username");
	var userError = document.getElementById("username-error");
	if(user.value.length == 0) {
		userError.style.color = "red";
		userError.innerHTML = "Vui lòng nhập tên vào đây";
	}else if(user.value.length < 7){
		userError.style.color = " red";
		userError.innerHTML = "Tên phải dài hơn 7 kí tự";
	}else{
		userError.style.color = "green";
		userError.innerHTML = "Tên hợp lệ";
		var checkUser = true;
	}
};

function validateTitle(){
	var title = document.getElementById("title");
	var titleError = document.getElementById("title-error");
	if(title.value.length == 0){
		titleError.style.color = "red";
		titleError.innerHTML = "Vui lòng nhập chủ đề";
		var checkTitle = false;
	}else{
		titleError.style.color = "green";
		titleError.innerHTML = "Hợp lệ";
		var checkTitle = true;
	}
};	

function validateMessage(){
	var message = document.getElementById("message");
	var messageError = document.getElementById("message-error");
	if(message.value.length > 200) {
		messageError.style.color = "red";
		messageError.innerHTML = "Không nhập quá 200 kí tự";
		var checkMessage = false;
	}else {
		var checkMessage = true;
	}
};

function myFunction(){
		alert("Bạn đã gửi mail thành công!");}


$(document).ready(function(){

		var checkUser = false;
		var checkTitle = false;
		var checkMessage = false;
		$( "#btnSubmit" ).prop( "disabled", true );


});

