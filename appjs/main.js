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
  //loadAccountInfo();
  fn.load('home.html');
};

// After Login panel home init //
document.addEventListener('init', function(event) {

	const page = event.target ;
  	const token = localStorage.getItem("token");		
	
	
  if (event.target.matches('#home')) {

		$("#home .page__background").css("background","transparent");
	   user_detail(token);
	   total_stats();
	
  }
  
  
  if (event.target.matches('#add_bit')) {

		$.ajax({
			type:'POST',
			url:baseUrl+"bit_category",
			data:{"action":"bit_category"},
			dataType: 'json',
			headers: {
				"Authorization": "Bearer "+token,
				"Accept": "application/json"
			},
			success: function(data){		

			
				var select ='<option value=""> Select Bit Category</option>';
				$.each(data, function (idx, obj) {      						
					select +=  '<option value="'+ obj.id +'"> '+ obj.category_name +' </option>';
				});  

				$("#bit_category").html(select);
				

					
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});

		$('#add_bit_form').on('submit',(function(e) {
			e.preventDefault();
				
			
			$("#submit_button_add_bit").attr("disabled","disabled");


			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"add_bit",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {

								if(data.status=='success'){
									$('#add_bit_form').trigger("reset");
								}

							
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

				setTimeout(function(){ $("#submit_button_add_bit").removeAttr('disabled');}, 3000);
				
				return false;	
						
		}));
				
  	}
// Edit Bit

if (event.target.matches('#edit_bit')) {

	console.log(page.data.bit_id);

// Bit detail
		var bit_id = page.data.bit_id;
		
		$.ajax({
			type:'POST',
			url:baseUrl+"bit_detail",
			data:{"action":"bit_detail","bit_id":bit_id},
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			  },
			success: function(data){		
				console.log(data)
			  						
			
			//	$("#bit_name").val("test");
			
				$("#bit_name_val").val(data[0].bit_name);
				
				$("#bit_location").val(data[0].bit_location);
				$("#bit_owner").val(data[0].bit_owner);
				$("#bit_contact_number").val(data[0].bit_contact_number);

				
				var	select =  '<option value="'+ data[0].category.id +'"> '+ data[0].category.category_name +' </option>';  

				$("#bit_category").append(select);
				
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});

		
		
	$.ajax({
		type:'POST',
		url:baseUrl+"bit_category",
		data:{"action":"bit_category"},
		dataType: 'json',
		headers: {
			"Authorization": "Bearer "+token,
			"Accept": "application/json"
		},
		success: function(data){		

			var select ='';
			$.each(data, function (idx, obj) {      						
				select +=  '<option value="'+ obj.id +'"> '+ obj.category_name +' </option>';
			});  

			$("#bit_category").append(select);
			

				
		},
		error: function(data){
			ons.notification.alert({
						title: 'Sorry!',
						message: 'Internet Connection Problem'
					});
		}
		
	});



	$('#edit_bit_form').on('submit',(function(e) {
		e.preventDefault();
			
		//$("#submit_button_edit_bit").attr("disabled","disabled");

		var formData = new FormData(this);

			$.ajax({
				type:'POST',
				url:baseUrl+"add_bit",
				data:formData,
				headers: {
					"Authorization": "Bearer "+token,
					"Accept": "application/json"
				},
				cache:false,
				contentType: false,
				processData: false,
				enctype: 'multipart/form-data',
				success:function(data){
					
					ons.notification.alert({
						title:  '<center>'+ data.title+ '</center>',
						message: '<center>'+ data.message+ '</center>',
						callback: function(answer) {

							if(data.status=='success'){
								//$('#add_bit_form').trigger("reset");
							}
						
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

			//setTimeout(function(){ $("#submit_button_add_bit").removeAttr('disabled');}, 3000);
			
			return false;	
					
	}));
			
  }





if (event.target.matches('#add_bit_category')) {

		$('#add_bit_category_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"add_bit_category",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
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
						
		}));
				
}
  
  
// Bit List
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
						table +=  '<tr onclick="bitDetail('+obj.id+')">'+
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



			$("#bit_search").submit(function (){
			
				let  bit_name = $("#bit_name").val();			

				$.ajax({
					type:'POST',
					url:baseUrl+"bitSearch",
					data:{"action":"bit_search","bit_name":bit_name},
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
									  '<td onclick="bitDetail('+obj.id+')">'+obj.bit_name+'</td>'+
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
					
				return false;	
										
			});
	}


	
// Bit Detail //
	if (event.target.matches('#bit_detail')) {

		var bit_id = page.data.bit_id;
		
		$.ajax({
			type:'POST',
			url:baseUrl+"bit_detail",
			data:{"action":"bit_detail","bit_id":bit_id},
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			  },
			success: function(data){		

				var table = `<table id="customers"><tbody>
									<tr>
										<th> Name </th>
										<td> ${data[0].bit_name} </td>
									</tr>
									<tr>
										<th> Owner Photo </th>
										<td> <img src="${siteUrl}public/bit_images/${data[0].owner_photo}" width="100px"> </td>
									</tr>
									<tr>
										<th> Location </th>
										<td> ${data[0].bit_location} </td>
									</tr>
									<tr>
										<th> Owner  </th>
										<td>  ${data[0].bit_owner} </td>
									</tr>
									<tr>
										<th> Contact Number </th>
										<td> ${data[0].bit_contact_number} </td>
									</tr>
									<tr>
										<th>  Action </th>
										<td align="center">  <button class="edit_button" style="margin-right: 50px" onclick="editBit(${data[0].id})"> Edit </button>  <button class="delete_button" onclick="deleteBit(${data[0].id})"> Delete </button> </td>
									</tr>
									</tbody>
								</table>`;	
	
				$("#bit_detail_content").html(table);
				
					
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


		let bit_exist = false;

		$("#bit_collection_name").change(function (e){	

			var bit_name = $(this).val();

			$.ajax({
				url:baseUrl+"bit_exist",
				data:{"action":"bit_exisit","bit_name":bit_name},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							
					  if(data.bit_count == 0){
						
						ons.notification.alert({
							title: 'Sorry!',
								message: 'Bit Not Exist'
							});	
							
							$("#bit_collection_fare").val(0);
						    $("#bit_collection_utility").val(0 );
						    $("#bit_collection_amount").val(0 );

					  }else{
						bit_exist= true;

						$("#bit_collection_fare").val(data.bit_category[0].fare );
						$("#bit_collection_utility").val(data.bit_category[0].utility );
						$("#bit_collection_amount").val(data.bit_category[0].fare + data.bit_category[0].utility );

					  } 
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}

			});
		});
	
		$("#bit_collection_form").submit(function (){
			
			if(bit_exist==false){
				ons.notification.alert({
					title: 'Sorry!',
						message: 'Bit Not Exist or Correct'
					});		

				return false;	
			}

			
			$("#submit_button_bit_collection").attr("disabled","disabled");

			let  bit_name = $("#bit_collection_name").val();
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

			setTimeout(function(){ $("#submit_button_bit_collection").removeAttr('disabled');}, 3000);
			
			return false;	
									
		});	
	
	}
  

// Transport add //

if (event.target.matches('#add_transport_category')) {
				
		$('#add_transport_form').on('submit',(function(e) {
			e.preventDefault();
				
				var formData = new FormData(this);
				
				$.ajax({
					type:'POST',
					url:baseUrl+"add_transport",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								$('#add_transport_form').trigger("reset");
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
						
		}));
		
}


// Transport Collection //
	
if (event.target.matches('#transport_collection')) {
				

	$.ajax({
		type:'POST',
		url:baseUrl+"transport",
		data:{"action":"transport"},
		dataType: 'json',
		headers: {
			"Authorization": "Bearer "+token,
			"Accept": "application/json"
		},
		success: function(data){		

			$("#invoice_number").val(data.uniq_id);

			var select ='<option value=""> Select Transport</option>';
			$.each(data.transport, function (idx, obj) {      						
				select +=  '<option value="'+ obj.id +'"> '+ obj.name +' </option>';
			});  

			$("#transport_id").html(select);
				
		},
		error: function(data){
			ons.notification.alert({
						title: 'Sorry!',
						message: 'Internet Connection Problem'
					});
		}
		
	});
// transport on change e rent load

			$("#transport_id").change(function (e){	
				e.preventDefault();

				let transport_id = $(this).val();

				$.ajax({
					url:baseUrl+"transport_detail_by_id",
					data:{"action":"transport_detail_by_id","transport_id":transport_id},
					dataType: 'json',
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					method:"post",
					success: function(data){
								
						console.log(data); 
						$("#amount").val(data[0].rent);							
					},
					error: function(data){
						
							ons.notification.alert({
										title: 'Sorry!',
											message: 'Internet Connection Problem'
										});		
														
					}

				});
			});


// transport on change rent load end

$('#transport_colleciton_form').on('submit',(function(e) {
	e.preventDefault();
		

	$("#submit_button_transport_collection").attr("disabled","disabled");

	var formData = new FormData(this);

		$.ajax({
			type:'POST',
			url:baseUrl+"transport_collection",
			data:formData,
			headers: {
				"Authorization": "Bearer "+token,
				"Accept": "application/json"
			},
			cache:false,
			contentType: false,
			processData: false,
			enctype: 'multipart/form-data',
			success:function(data){
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
		
		setTimeout(function(){ $("#submit_button_transport_collection").removeAttr('disabled');}, 3000);

		return false;	
				
}));
		
}

// Report //  
  if (event.target.matches('#transport_report')) {
	
	$.ajax({
		type:'POST',
		url:baseUrl+"TodayTransportCollection",
		data:{"action":"TodayTransportCollection"},
		dataType: 'json',
		headers: {
			 "Authorization": "Bearer "+token,
			 "Accept": "application/json"
		  },
		beforeSend: function(){
			$(".ajaxloader").show();
		},
		complete: function(){
			$(".ajaxloader").hide();
		},
		success: function(data){	
			
			var table = `<table id="customers">
								<tbody>
									<tr>
										<th>Date</th> <th>Invoice number</th> <th>Amount</th> 
									</tr>`;
				
								$.each(data, function (idx, obj) {      						
									
									table +=  `<tr onclick="transportCollectionReport(${ obj.id})">
													<td> ${ obj.custom_date}  </td> <td> ${ obj.invoice_number} </td> <td> ${ obj.amount} </td>
												</tr>`;

								}); 				
									
							table +=`</tbody>
							</table>`;	

			$("#transport_collection_data").html(table);
			
				
		},
		error: function(data){
			ons.notification.alert({
						title: 'Sorry!',
						message: 'Internet Connection Problem'
					});
		}
		
	});



	
	$("#search_transport_report").on('submit',function(e) {
		e.preventDefault(); 

		let date_start  = $("#date_start").val();
		let date_end = $("#date_end").val();

		$.ajax({
			type:'POST',
			url:baseUrl+"transport_collection_daterange",
			data:{"action":"bits","date_start":date_start,"date_end":date_end },
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			},
			beforeSend: function(){
				$(".ajaxloader").show();
			},
			complete: function(){
				$(".ajaxloader").hide();
			},
			success: function(data){	
				$(".ajaxloader").hide();
			if(data.length==0){
				alert("No data found");
			}
			var table = `<table id="customers">
							<tbody>
								<tr>
									<th>Date</th> <th>Vehicle Number</th> <th>Amount</th> 
								</tr>`;

							$.each(data, function (idx, obj) {      						
								
								table +=  `<tr onclick="transportCollectionReport(${ obj.id})">
												<td> ${ obj.custom_date}  </td> <td> ${ obj.vehicle_number} </td> <td> ${ obj.amount} </td>
											</tr>`;

							}); 				
								
						table +=`</tbody>
						</table>`;	

				$("#transport_collection_data").html(table);
				
					
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});
		//ekhane
	});	

}	

if (event.target.matches('#transport_collection_detail')) {

	var collection_id = page.data.collection_id;
	const token = localStorage.getItem("token");
	
			$.ajax({
				url:baseUrl+"transport_collection_detail",
				data:{"action":"transport_collection_detail","collection_id":collection_id},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					 var table = '<table id="customers">';
				 
					$.each(data, function (idx, obj) {      						
						table +=  '<tr><th>Date</th><td>'+obj.custom_date+'</td></tr>'+
									'<tr><th>Driver Name</th><td>'+obj.driver_name+'</td></tr>'+
									'<tr><th>Vehicle Type</th><td>'+obj.transport.name+'</td></tr>'+
									'<tr><th>Vehicle Number</th><td>'+obj.vehicle_number+'</td></tr>'+
									'<tr><th>License Number</th><td>'+obj.license_number+'</td></tr>'+
									'<tr><th>Contact Number</th><td>'+obj.contact_number+'</td></tr>'+
									'<tr><th>Amount</th><td>'+obj.amount+'</td></tr>';
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
			  	beforeSend: function(){
					$(".ajaxloader").show();
				},
				complete: function(){
					$(".ajaxloader").hide();
				},
				success: function(data){		
				
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Bit Name</th>'+
										'<th>Fare</th>'+
										'<th>Utility</th>'+
										'<th>Due</th>'+
										'<th>Col.Due</th>'+
									'</tr>';
					var total_fare = 0;		
					var total_utility = 0;		
					var total_due = 0;		
					var total_due_collection = 0;		
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.bit.bit_name+'</td>'+
									'<td>'+obj.fare+'</td>'+
									'<td>'+obj.utility+'</td>'+
									'<td>'+obj.due+'</td>'+
									'<td>'+obj.collection_due+'</td>'+
								  '</tr>';
							total_fare +=  parseInt(obj.fare);
							total_utility +=  parseInt(obj.utility);
							total_due +=  parseInt(obj.due);
							total_due_collection +=  parseInt(obj.collection_due);
					});  

					console.log(total_fare);
						
					table +='<tr style="font-weight: bold;"> <td> Total : </td> <td>'+ total_fare+' </td>  <td>' + total_utility +'</td> <td> ' + total_due +' </td> <td>'+total_due_collection+' </td> </tr></table>';	
		
					$("#table_content").html(table);
					
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});


			

			$("#search_bit_report").on('submit',function(e) {
				e.preventDefault(); 

				let date_start  = $("#date_start").val();
				let date_end = $("#date_end").val();

				$.ajax({
					type:'POST',
					url:baseUrl+"bit_collection_daterange",
					data:{"action":"bits","date_start":date_start,"date_end":date_end },
					dataType: 'json',
					headers: {
						 "Authorization": "Bearer "+token,
						 "Accept": "application/json"
					},
					beforeSend: function(){
						$(".ajaxloader").show();
					},
					complete: function(){
						$(".ajaxloader").hide();
					},
					success: function(data){		
					
						var table = '<table id="customers">'+
										'<tr>'+
											'<th>Bit Name</th>'+
											'<th>Fare</th>'+
											'<th>Utility</th>'+
											'<th>Due</th>'+
											'<th>Col.Due</th>'+
										'</tr>';
						var total_fare = 0;		
						var total_utility = 0;		
						var total_due = 0;		
						var total_due_collection = 0;		
						$.each(data, function (idx, obj) {      						
							table +=  '<tr>'+
										'<td>'+obj.bit.bit_name+'</td>'+
										'<td>'+obj.fare+'</td>'+
										'<td>'+obj.utility+'</td>'+
										'<td>'+obj.due+'</td>'+
										'<td>'+obj.collection_due+'</td>'+
									  '</tr>';
								total_fare +=  parseInt(obj.fare);
								total_utility +=  parseInt(obj.utility);
								total_due +=  parseInt(obj.due);
								total_due_collection +=  parseInt(obj.collection_due);
						});  
							
						table +='<tr style="font-weight: bold;"> <td> Total : </td> <td>'+ total_fare+' </td>  <td>' + total_utility +'</td> <td> ' + total_due +' </td> <td>'+total_due_collection+' </td> </tr></table>';	
			
						$("#table_content").html(table);
						
							
					},
					error: function(data){
						ons.notification.alert({
									title: 'Sorry!',
									message: 'Internet Connection Problem'
								});
					}
					
				});
				//ekhane
			});		


	 }	 
  
	 

	 if (event.target.matches('#add_expense')) {
	
		$.ajax({
			type:'POST',
			url:baseUrl+"expense_chart",
			data:{"action":"expense_chart"},
			dataType: 'json',
			headers: {
				"Authorization": "Bearer "+token,
				"Accept": "application/json"
			},
			success: function(data){		

			
				var select ='<option value=""> Select Expense </option>';
				$.each(data, function (idx, obj) {      						
					select +=  '<option value="'+ obj.id +'"> '+ obj.account_name +' </option>';
				});  

				$("#expense_name").html(select);
				

					
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});
	
		$('#add_expense_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"add_expense",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								$('#add_expense_chart_form').trigger("reset");
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
		
									
		}));
		
	
	}
	 
	 if (event.target.matches('#add_expense_chart')) {
	
	
		$('#add_expense_chart_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"add_expense_chart",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								$('#add_expense_chart_form').trigger("reset");
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
		
									
		}));
		
	
	}

	
//	Export Report //
if (event.target.matches('#expense_report')) {
	
	$.ajax({
		type:'POST',
		url:baseUrl+"expense_list",
		data:{"action":"expense_list"},
		dataType: 'json',
		headers: {
			 "Authorization": "Bearer "+token,
			 "Accept": "application/json"
		  },
		success: function(data){	
			
			var table = `<table id="customers">
								<tbody>
									<tr>
										<th>Date</th> <th>Expense Category</th> <th>Amount</th> 
									</tr>`;
				
								$.each(data, function (idx, obj) {      						
									
									table +=  `<tr onclick="expenseDetail(${ obj.id})">
													<td> ${ obj.custom_date}  </td> <td> ${ obj.accountchart.account_name} </td> <td> ${ obj.amount} </td>
												</tr>`;

								}); 				
									
							table +=`</tbody>
							</table>`;	

			$("#table_content").html(table);
			
				
		},
		error: function(data){
			ons.notification.alert({
						title: 'Sorry!',
						message: 'Internet Connection Problem'
					});
		}
		
	});



	
	$("#search_report_form").on('submit',function(e) {
		e.preventDefault(); 

		let date_start  = $("#date_start").val();
		let date_end = $("#date_end").val();

		$.ajax({
			type:'POST',
			url:baseUrl+"expense_daterange",
			data:{"action":"expense_daterange","date_start":date_start,"date_end":date_end },
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			},
			beforeSend: function(){
				$(".ajaxloader").show();
			},
			complete: function(){
				$(".ajaxloader").hide();
			},
			success: function(data){		
				$(".ajaxloader").hide();
				var table = `<table id="customers">
								<tbody>
									<tr>
										<th>Date</th> <th>Expense Category</th> <th>Amount</th> 
									</tr>`;
				
								$.each(data, function (idx, obj) {      						
									
									table +=  `<tr onclick="expenseDetail(${ obj.id})">
													<td> ${ obj.custom_date}  </td> <td> ${ obj.accountchart.account_name} </td> <td> ${ obj.amount} </td>
												</tr>`;

								}); 				
									
							table +=`</tbody>
							</table>`;	

				$("#table_content").html(table);
				
					
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});
		//ekhane

		return false;
	});


}



	if (event.target.matches('#bank_list')) {
	
		$.ajax({
			type:'POST',
			url:baseUrl+"bank_list",
			data:{"action":"bank_list"},
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			  },
			success: function(data){	
				
				var table = `<table id="customers">
									<tbody>
										<tr>
											<th>Bank Name</th> <th>Branch</th> 
										</tr>`;
					
									$.each(data, function (idx, obj) {      						
										
										table +=  `<tr>
														<td> ${ obj.bank_name}  </td> <td> ${ obj.bank_branch} </td>
													</tr>`;
	
									}); 				
										
								table +=`</tbody>
								</table>`;	
	
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




	
	if (event.target.matches('#add_bank')) {
	
		$('#add_bank_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"add_bank",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								$('#add_bank_form').trigger("reset");
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
		
									
		}));
		
	
	}



	if (event.target.matches('#bank_deposit')) {
	
		$.ajax({
			type:'POST',
			url:baseUrl+"bank_list",
			data:{"action":"bank_list"},
			dataType: 'json',
			headers: {
				"Authorization": "Bearer "+token,
				"Accept": "application/json"
			},
			success: function(data){		

				var select ='<option value=""> Select Bank </option>';
				$.each(data, function (idx, obj) {      						
					select +=  '<option value="'+ obj.id +'"> '+ obj.bank_name +' </option>';
				});  

				$("#bank_list").html(select);
					
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});
	
		$('#bank_deposit_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"bank_deposit",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								$('#add_expense_chart_form').trigger("reset");
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
		
									
		}));
		
	
	}

	if (event.target.matches('#bank_report')) {

		$.ajax({
			type:'POST',
			url:baseUrl+"deposit_list",
			data:{"action":"deposit_list"},
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			  },
			success: function(data){	
				
				console.log(data);
	
	
				var table = `<table id="customers">
									<tbody>
										<tr>
											<th>Date</th> <th>Bank Name</th> <th>Deposit Slip </th> <th> Amount </th> 
										</tr>`;
					
									$.each(data, function (idx, obj) {      						
										
										table +=  `<tr >
														<td> ${ obj.deposit_date}  </td> <td> ${ obj.bank.bank_name} </td>  <td> ${ obj.deposit_slip_number} </td> <td> ${ obj.amount} </td>
													</tr>`;
	
									}); 				
										
								table +=`</tbody>
								</table>`;	
	
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
	
	
		$('#add_book_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"cooperative_add_book",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								if(data.status=='success'){
									$('#add_book_form').trigger("reset");
								}
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
		
									
		}));
		
	
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
			
	
					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Book Number</th>'+
										'<th>Name</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td onclick="cooperativeBookDetail('+obj.id+')">'+obj.book_number+'</td>'+
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




			$("#cooperative_book_search").submit(function (){
			
				let  member_name = $("#member_name").val();			

				$.ajax({
					type:'POST',
					url:baseUrl+"cooperative_book_Search",
					data:{"action":"cooperative_book_Search","member_name":member_name},
					dataType: 'json',
					headers: {
						 "Authorization": "Bearer "+token,
						 "Accept": "application/json"
					  },
					success: function(data){		
		
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
				
				
				
				return false;	
										
			});

	}

	

	if (event.target.matches('#cooperative_book_detail')) {

		var book_id = page.data.book_id;
		
		$.ajax({
			type:'POST',
			url:baseUrl+"cooperative_book_detail",
			data:{"action":"book_detail","book_id":book_id},
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			  },
			success: function(data){	
				
				console.log(data);

				

				var table = `<table id="customers"><tbody>
									<tr>
										<th> Name </th>
										<td> ${data[0].book_number} </td>
									</tr>
									<tr>
										<th> Name </th>
										<td> ${data[0].member_name} </td>
									</tr>
									<tr>
										<th> Contact </th>
										<td> ${data[0].member_contact} </td>
									</tr>
									<tr>
										<th> Owner Photo </th>
										<td> <img src="${siteUrl}public/cooperative_image/${data[0].member_photo}" width="100px"> </td>
									</tr>
									<tr>
										<th> Contact </th>
										<td> ${data[0].nid} </td>
									</tr>

									</tbody>
								</table>`;	
	
					$("#book_detail_content").html(table);

				
				
					
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
			let  custom_date = $("#custom_date").val();
			let  amount = $("#amount").val();

		
			$.ajax({
				url:baseUrl+"cooperative_add_deposit",
				data:{"action":"cooperative_add_deposit","book_number":book_number,"custom_date":custom_date,"amount":amount},
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
			let  custom_date = $("#custom_date").val();
			let  amount = $("#amount").val();

		
			$.ajax({
				url:baseUrl+"cooperative_withdraw",
				data:{"action":"cooperative_add_deposit","book_number":book_number,"custom_date":custom_date,"amount":amount},
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
			let  custom_date = $("#custom_date").val();
			let  amount = $("#amount").val();

		
			$.ajax({
				url:baseUrl+"cooperative_loan",
				data:{"action":"cooperative_loan","loan_number":loan_number,"name":name,"custom_date":custom_date,"amount":amount},
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
									'<td>'+obj.custom_date+'</td>'+
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
									'<td>'+obj.custom_date+'</td>'+
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
	
	
	
	if (event.target.matches('#loan_list')) {
	   
		$.ajax({
				type:'POST',
				url:baseUrl+"cooperative_loan_list",
				data:{"action":"loan_list"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){	

					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Loan #</th>'+
										'<th>Name</th>'+
										'<th>Amount</th>'+
										'<th>Date</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td>'+obj.loan_id+'</td>'+
									'<td>'+obj.name+'</td>'+
									'<td>'+obj.amount+'</td>'+
									'<td>'+obj.custom_date+'</td>'+
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
	   
	
		$('#add_user_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"add_user",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
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
									
		}));
		
	
	}


	  
  
	if (event.target.matches('#user_list')) {
	   
	
		$.ajax({
				type:'POST',
				url:baseUrl+"user_list",
				data:{"action":"user_list"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				success: function(data){		
	
						console.log(data);

					var table = '<table id="customers">'+
									'<tr>'+
										'<th>Name</th>'+
										'<th>Role</th>'+
										'<th>Contact</th>'+
									'</tr>';
								
					$.each(data, function (idx, obj) {      						
						table +=  '<tr>'+
									'<td onclick="userDetail('+obj.id+')">'+obj.name+'</td>'+
									'<td>'+obj.role+'</td>'+
									'<td>'+obj.contact_number+'</td>'+
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



  

	
    if (event.target.matches('#edit_profile')) {
		
		$.ajax({
			type:'POST',
			url:baseUrl+"userdetail",
			data:{"action":"user_detail"},
			dataType: 'json',
			headers: {
				 "Authorization": "Bearer "+token,
				 "Accept": "application/json"
			  },
			success: function(data){	

				console.log(data);		
				$("#name").val(data.name);
				var profile_image = `<img src="${siteUrl}public/user_photo/${data.user_photo}" width="100px"></img>`;		
				$("#user_photo").html(profile_image);
				$("#email").val(data.email);
				$("#role").val(data.role);
				$("#contact_number").val(data.contact_number);
			
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});



		
		$('#edit_profile_form').on('submit',(function(e) {
			e.preventDefault();
				
			var formData = new FormData(this);

				$.ajax({
					type:'POST',
					url:baseUrl+"update_user",
					data:formData,
					headers: {
						"Authorization": "Bearer "+token,
						"Accept": "application/json"
					},
					cache:false,
					contentType: false,
					processData: false,
					enctype: 'multipart/form-data',
					success:function(data){
						ons.notification.alert({
							title:  '<center>'+ data.title+ '</center>',
							message: '<center>'+ data.message+ '</center>',
							callback: function(answer) {
								//$('#edit_profile_form').trigger("reset");
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
									
		}));
	
	}





}, false);	



function editBit(id){
	var data = {data: {title: 'Edit Bit',bit_id:id}}
	fn.pushpage("edit_bit.html",data,"fade");
}

function deleteBit(){

}

function deleteBitProcess(bit_id){

	const token = localStorage.getItem("token");
	
			$.ajax({
				url:baseUrl+"delete_bit",
				data:{"action":"delete-bit","bit_id":bit_id},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					 console.log(data);	
					 
					 $("#bit_collection_fare").val(data[0].fare);
					 $("#bit_collection_utility").val(data[0].utility);
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});

	
}

function bitDetail(id){
	var data = {data: {title: 'Bit Detail',bit_id:id}}
	fn.pushpage("bit_detail.html",data,"fade");
}

function cooperativeBookDetail(id){
	var data = {data: {title: 'Book Detail',book_id:id}}
	 fn.pushpage("cooperative_book_detail.html",data,"fade");
}

function bitFare(category_id){
	
	const token = localStorage.getItem("token");
	
			$.ajax({
				url:baseUrl+"bit_category_detail",
				data:{"action":"bit_category_detail","category_id":category_id},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
					 console.log(data);	
					 
					 $("#bit_collection_fare").val(data[0].fare);
					 $("#bit_collection_utility").val(data[0].utility);
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});

			return false;
}

// Ttoal start //
function total_stats(){
		
	const token = localStorage.getItem("token");
	
			$.ajax({
				url:baseUrl+"totalStats",
				data:{"action":"totalStats"},
				dataType: 'json',
				headers: {
					 "Authorization": "Bearer "+token,
					 "Accept": "application/json"
				  },
				method:"post",
				success: function(data){
							 
				//	return data;	

					$("#total_bit_collection").html(data.total_bit_collection);
					$("#total_transport_collection").html(data.total_transport_collection);
					$("#total_expense").html(data.total_expense);
					$("#total_bank_deposit").html(data.total_bankdeposit);
												   
				},
				error: function(data){
					
						 ons.notification.alert({
									title: 'Sorry!',
										message: 'Internet Connection Problem'
									});		
													
				}
			});
			
	}


	function transportCollectionReport(id){

		var data = {data: {title: 'Transport Collection Detail',collection_id:id}}
	 	fn.pushpage("transport_collection_detail.html",data,"fade");


	}