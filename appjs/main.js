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
										<td> dfdf </td>
									</tr>
									<tr>
										<th> Owner  </th>
										<td> dfdf </td>
									</tr>
									<tr>
										<th> Contact Number </th>
										<td> dfdf </td>
									</tr></tbody>
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
				
				var select ='<option value=""> Select Bit </option>';
				$.each(data, function (idx, obj) {      						
					select +=  '<option value="'+ obj.id +'"> '+ obj.bit_name +' </option>';
				});  
	
				$("#bit_name").html(select);
				
					
			},
			error: function(data){
				ons.notification.alert({
							title: 'Sorry!',
							message: 'Internet Connection Problem'
						});
			}
			
		});

	
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

		
			var select ='<option value=""> Select Transport</option>';
			$.each(data, function (idx, obj) {      						
				select +=  '<option value="'+ obj.id +'"> '+ obj.name +' </option>';
			});  

			$("#transport").html(select);
				
		},
		error: function(data){
			ons.notification.alert({
						title: 'Sorry!',
						message: 'Internet Connection Problem'
					});
		}
		
	});

$('#transport_colleciton_form').on('submit',(function(e) {
	e.preventDefault();
		
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

				
					var select ='<option value=""> Select Transport</option>';
					$.each(data, function (idx, obj) {      						
						select +=  '<option value="'+ obj.id +'"> '+ obj.name +' </option>';
					});  

					$("#transport").html(select);
						
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			});

		$('#transport_colleciton_form').on('submit',(function(e) {
			e.preventDefault();
				
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
				
				return false;	
						
		}));
				
  }
  
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
		success: function(data){	
			
			console.log(data);


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
				success: function(data){		
				
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
								$('#add_book_form').trigger("reset");
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
  
  
  
  
}, false);	




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
					$("#total_transport").html(data.total_transport);
					$("#total_expense").html(data.total_expense);
												   
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