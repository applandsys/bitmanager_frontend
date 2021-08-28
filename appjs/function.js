window.fn = {};

window.fn.exit =  function(){
						ons.notification.alert({
								title: 'Thanks!',
								message: '<center>Are your Sure want to Exit</center>',
								callback: function(answer) {
										navigator.app.exitApp();
										}
								  });
					}


function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
}

function hideModal(){
	var modal = document.querySelector('ons-modal');
    modal.hide();
}


function showModalInternet() {
  var modal = document.querySelector('ons-modal#internetcheck');
  modal.show();
}


function NetproblemExit(){
	ons.notification.alert({
							title: 'Failed ?',
							message: '<center>  Connection Failed . Please Check your Internet Connection. </center>',
							callback: function(answer) {
								   navigator.app.exitApp();
							}
						});
	

}



fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};



fn.pushpage = function(page,data,anime){
	document.querySelector('#appNavigator').pushPage(page,data,{animation: anime});
}

// Load Page //
window.fn.load = function(page) {
  var content = document.getElementById('content');
  content.load(page);
};

var pushpage = function(page,data,anime){
	document.querySelector('#myNavigator').pushPage(page,data,{animation: anime});
}



// Logout
window.fn.logout = function() {
	alert("dd");
  localStorage.setItem("user_id", null); // User databas id
  localStorage.removeItem("user_id"); // User databas id
  localStorage.clear();
  ons.notification.alert({title: 'Thanks!',	message: '<center>You are Logged Out</center>'});
  window.location.replace("index.html");
};

			
	

window.fn.exit =  function(){

						ons.notification.alert({
								title: 'Thanks!',
								message: '<center>Are your Sure want to Exit</center>',
								callback: function(answer) {
										navigator.app.exitApp();
										}
								  }); 
					}
						
	