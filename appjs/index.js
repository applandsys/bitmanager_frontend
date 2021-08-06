document.addEventListener('init', function(event) {

  var page = event.target ;

	
  if (event.target.matches('#splash')) {
	  
	setTimeout(function(){
		
		if(user_id > 0){
				window.location.replace("panel.html");
		}else{
			fn.load('login_page.html');
		}  
	 },
	1000);
	
  }	
  


  
}, false);
