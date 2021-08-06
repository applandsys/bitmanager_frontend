if(navigator.onLine){
		//alert(navigator.onLine);
}else{
	showModalInternet();
}

///=======================================================================///
	

// History open menu//
var historyOpen = function() {
  fn.load('history.html');
};


// Home Open by menu
var home = function() {
  loadAccountInfo();
  fn.load('home.html');
};

// After Login panel home init //
document.addEventListener('init', function(event) {
	
  const token = localStorage.getItem("token");		
	
	
  if (event.target.matches('#home')) {

	 user_detail(token);
	
  }
  
  if (event.target.matches('#add_bit')) {
		$("#add_bit_form").submit(function (){
			
			let  bit_name = $("#bit_name").val();
			let  bit_location = $("#bit_location").val();
			let  bit_owner = $("#bit_owner").val();
			let  bit_contact_number = $("#bit_contact_number").val();
			let  image = $("#selectedFile").val();

			var formData = new FormData();

			console.log(formData);
		
			$.ajax({
				url:baseUrl+"add_bit",
				data:{"action":"add_bit","bit_name":bit_name,"bit_location":bit_location,"bit_owner":bit_owner,"bit_contact_number":bit_contact_number,"image":image},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				cache:false,
				contentType: false,
				processData: false,
				enctype: 'multipart/form-data',
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#add_bit_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});	
				
  }
  
  
   if (event.target.matches('#bit_list')) {
	   
	
		$.ajax({
				type:'POST',
				url:baseUrl+"bits",
				data:{"action":"bits"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){		
	
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Bit Name</th>'+
										'<th>Location</th>'+
										'<th>Contact</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.bit_name+'</td>'+
									'<td>'+obj.bit_location+'</td>'+
									'<td>'+obj.bit_contact_number+'</td>'+
								  '</tr>';
					});  

					table +='</table>';	
		
					$("#table_content").html(table);
					
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});
	
	}
	
	 
   if (event.target.matches('#bit_collection')) {
	   
	
		$("#bit_collection_form").submit(function (){
			
			let  bit_name = $("#bit_name").val();
			let  bit_collection_fare = $("#bit_collection_fare").val();
			let  bit_collection_utility = $("#bit_collection_utility").val();
			let  bit_collection_due = $("#bit_collection_due").val();
			let  bit_collection_amount = $("#bit_collection_amount").val();

		
			$.ajax({
				url:baseUrl+"bit_collection",
				data:{"action":"bit_collection","bit_name":bit_name,"fare":bit_collection_fare,"utility":bit_collection_utility,"due":bit_collection_due,"collection_due":bit_collection_amount},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#bit_collection_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});
		
	
	}
  
  
	if (event.target.matches('#bit_collection_report')) {
		 
		$.ajax({
				type:'POST',
				url:baseUrl+"bit_collection_list",
				data:{"action":"bits"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){		
				
				console.log(data);
	
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Bit Name</th>'+
										'<th>Fare</th>'+
										'<th>Utility</th>'+
										'<th>Due</th>'+
										'<th>Col.Due</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.bit.bit_name+'</td>'+
									'<td>'+obj.fare+'</td>'+
									'<td>'+obj.utility+'</td>'+
									'<td>'+obj.due+'</td>'+
									'<td>'+obj.collection_due+'</td>'+
								  '</tr>';
					});  

					table +='</table>';	
		
					$("#table_content").html(table);
					
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});
	 }	 
  
  
 
   if (event.target.matches('#cooperative_add_book')) {
	
		$("#add_book_form").submit(function (){
			
			let  book_number = $("#book_number").val();
			let  member_name = $("#member_name").val();
			let  member_contact = $("#member_contact").val();
		
			$.ajax({
				url:baseUrl+"cooperative_add_book",
				data:{"action":"cooperative_add_book","book_number":book_number,"member_name":member_name,"member_contact":member_contact},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#bit_collection_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});
		
	
	}
	
// Corporate Book list	
	if (event.target.matches('#cooperative_book_list')) {
	   
	
		$.ajax({
				type:'POST',
				url:baseUrl+"cooperative_book_list",
				data:{"action":"books"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){	

					console.log(data);				
	
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Book Number</th>'+
										'<th>Name</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.book_number+'</td>'+
									'<td>'+obj.member_name+'</td>'+
								  '</tr>';
					});  

					table +='</table>';	
		
					$("#table_content").html(table);
					
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});
	
	}
	
	
  
  if (event.target.matches('#add_deposit')) {
	   
	
		$("#add_deposit_form").submit(function (){
			
			let  book_number = $("#book_number").val();
			let  amount = $("#amount").val();

		
			$.ajax({
				url:baseUrl+"cooperative_add_deposit",
				data:{"action":"cooperative_add_deposit","book_number":book_number,"amount":amount},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#add_deposit_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});
		
	
	}
  
  
  
  if (event.target.matches('#withdraw')) {
	   
	
		$("#withdraw_form").submit(function (){
			
			let  book_number = $("#book_number").val();
			let  amount = $("#amount").val();

		
			$.ajax({
				url:baseUrl+"cooperative_withdraw",
				data:{"action":"cooperative_add_deposit","book_number":book_number,"amount":amount},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#add_deposit_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});
		
	
	}
  
  
  
    if (event.target.matches('#loan')) {
	   
	
		$("#loan_form").submit(function (){
			
			let  loan_number = $("#loan_number").val();
			let  name = $("#name").val();
			let  amount = $("#amount").val();

		
			$.ajax({
				url:baseUrl+"cooperative_loan",
				data:{"action":"cooperative_loan","loan_number":loan_number,"name":name,"amount":amount},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#loan_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});
		
	
	}
	
	
	
	if (event.target.matches('#deposit_list')) {
	   
	
		$.ajax({
				type:'POST',
				url:baseUrl+"cooperative_deposit_list",
				data:{"action":"books"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){	

					console.log(data);				
	
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Book Number</th>'+
										'<th>Amount</th>'+
										'<th>Date</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.book_number_id+'</td>'+
									'<td>'+obj.amount+'</td>'+
									'<td>'+obj.created_at+'</td>'+
								  '</tr>';
					});  

					table +='</table>';	
		
					$("#table_content").html(table);
					
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});
	
	}
	
	
	if (event.target.matches('#withdraw_list')) {
	   
	
		$.ajax({
				type:'POST',
				url:baseUrl+"cooperative_withdraw_list",
				data:{"action":"books"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){	

					console.log(data);				
	
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Book Number</th>'+
										'<th>Amount</th>'+
										'<th>Date</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.book_number_id+'</td>'+
									'<td>'+obj.amount+'</td>'+
									'<td>'+obj.created_at+'</td>'+
								  '</tr>';
					});  

					table +='</table>';	
		
					$("#table_content").html(table);
					
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});
	
	}
	
	
	
	
    if (event.target.matches('#add_user')) {
	   
	
		$("#add_user_form").submit(function (){
			
			let  user_fullname = $("#user_fullname").val();
			let  user_email = $("#user_email").val();
			let  user_password = $("#user_password").val();
			let  user_role = $("#user_role").val();
			let  user_contact_number = $("#user_contact_number").val();

		
			$.ajax({
				url:baseUrl+"add_user",
				data:{"action":"add_user","user_fullname":user_fullname,"user_email":user_email,"user_password":user_password,"user_role":user_role,"user_contact_number":user_contact_number},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					  ons.notification.alert({
								title:  '<center>'+ data.title+ '</center>',
								message: '<center>'+ data.message+ '</center>',
								callback: function(answer) {
									$('#add_user_form').trigger("reset");
								}
							}); 					   
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
			
			
			return false;	
									
		});
		
	
	}
  
  
  
  
}, false);	

