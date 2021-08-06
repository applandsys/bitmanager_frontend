
let user_detail = 
function (token){
	//var data;
		 $.ajax({
				type:'POST',
				url:baseUrl+"userdetail",
				data:{"action":"userdetail"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){		

					var profile_image = `<img src="${siteUrl}public/user_photo/${data.user_photo}" width="80px" style="border-radius: 50px;"></img>`;
					$("#user_name").html(data.name);
					$("#profile_image").html(profile_image);
					
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});
	//return data;			
	
}

 


