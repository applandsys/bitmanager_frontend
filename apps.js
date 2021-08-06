document.addEventListener("deviceready", onDeviceReady, false);
	
function onDeviceReady(){

		
    document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#home')){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           navigator.app.backHistory();
       }
    }, false);
	
	window.FirebasePlugin.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
		alert(token);
	}, function(error) {
		alert(error);
	});
		

	screen.orientation.lock('portrait');
	
			
	
}

/*

window.addEventListener("orientationchange", function(){
	screen.orientation.lock('portrait');
   alert("Apps Support only Potrait Orientation"); // e.g. portrait
});


*/