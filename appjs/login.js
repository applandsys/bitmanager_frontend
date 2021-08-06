//Login page
document.addEventListener('init', function(event) {
  if (event.target.matches('#login_page')) {
		
		$("#login_form").on('submit',function(e) {
		   e.preventDefault(); 

				var email = $("#user_id").val();
				var password = $("#password").val();
				
				 $.ajax({
					type:'POST',
					url:baseUrl+"login",
					data:{"action":"login","email":email,"password":password},
					dataType: 'json',
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					success: function(data){		

						if(data.status=='success'){
							localStorage.setItem("user_id", data.user_id);
							localStorage.setItem("token", data.token);
							window.location.replace('panel.html');
						}else if(data.status=='invalid'){
							ons.notification.alert({
									title: 'Sorry!',
									message: data.message
								});
						}
					},
					error: function(data){
						ons.notification.alert({
									title: 'Sorry!',
									message: 'Internet Connection Problem'
								});
					}
					
				});  
				return false; 
			 
			 
			 // ajax call
		});	
		
		
  }
}, false);	


