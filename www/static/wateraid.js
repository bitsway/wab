
$(document).ready(function(){						   
//------------------------safe water -------------					   
		$(".dateErr").empty();
		
		/*				   
		$("#safW_altOption").hide();
		$("#safW_dist").hide();
		$("#saf_acT").hide();
		$("#saf_arcP").hide();
		
		
		
	$("#sw_no").click(function(){					
		$("#safW_altOption").show();
		$("#safW_dist").show();
		$("#saf_acT").show();
		$("#saf_arcP").show();
	});
	
	$("#sw_na").click(function(){					
		$("#safW_altOption").show();
		$("#safW_dist").show();
		$("#saf_acT").show();
		$("#saf_arcP").show();
	});
	
	$("#sw_green").click(function(){	
		$("#safW_altOption").hide();
		$("#safW_dist").hide();
		$("#saf_acT").hide();
		$("#saf_arcP").hide();
			
	});*/

//-------------------------------------/portable
		$("#non_portbl_res").hide();		
	
	$("#st_non_portable").click(function(){					
		$("#non_portbl_res").show();
		
	});
	
	$("#st_portable").click(function(){					
		$("#non_portbl_res").hide();
		
	});
	
//-------------------------------------/all test complt
		$("#all_test_n_res").hide();		
	
	$("#all_test_y").click(function(){					
		$("#all_test_n_res").hide();
		
	});
	
	$("#all_test_n").click(function(){					
		$("#all_test_n_res").show();
		
	});
	
//-------------------------------------/manage comm trainee
		$("#m_comm_ori").hide();		
	
	$("#m_comm_ext_y").click(function(){					
		$("#m_comm_ori").show();
		
	});
	
	$("#m_comm_ext_n").click(function(){					
		$("#m_comm_ori").hide();
		
	});

//--------------------------check urban
	$("#pipe_conc").hide();
	$("#pipe_w_sup").hide();


});
//----------------------check TW color waterData8
	$("#waterData8").hide();
	
function checkTW(){
	var tw_color=$("input[name='tw_painter']:checked").val();
	
	if(tw_color=="red" ){
			var url="#waterData8";
		}else{
			var url="#waterData7";
		}
		$(location).attr('href',url);
		
	
	}
//-------------------------select test type
		
function waterDataNext(){
		var test_type_val=$("input[name='test_type']:checked").val();
	
		if(test_type_val=="pre" || test_type_val=="monitoring" ){
			var url="#waterData2";
		}else{
			var url="#waterData3";
		}
		$(location).attr('href',url);
		
		
			$("#photoAfter").hide();
		if(test_type_val=="Installation_Renovation"){
				$("#photoAfter").show();
				$("#pre_photo").hide();
			}
	};					   

function checkUrban(){
		
		$("#pipe_conc").show();
		
		var url="#waterData";
		$(location).attr('href',url);
		
		$("#piped_w_conn_y").click(function(){					
			$("#pipe_w_sup").show();
		});
		
		$("#piped_w_conn_n").click(function(){					
			$("#pipe_w_sup").hide();
			
		});
	
	
	
	};


function dateCheck(){
	$(".dateErr").empty();
	
	var wQFstDate=$("#fstDate").val();
	var wQLstDate=$("#lastDate").val();
	var wQaDate=$("#aDate").val();
	
	if((wQFstDate!='' || wQLstDate!='' || wQaDate!='')){
		if(wQFstDate>wQLstDate){
			$(".dateErr").text("Check First Date");
		}else if(wQLstDate>wQaDate){
			$(".dateErr").text("Check last Date");
		}else{
			var url="#waterData5";
			$(location).attr('href',url);
			}
	}else{
		var url="#waterData5";
			$(location).attr('href',url);
		
		}	
	
	/*if(wQLstDate!='' && wQaDate!=''){
		if(wQLstDate>wQaDate){
			$(".dateErr").text("Check last Date");
		}else{
			var url="#waterData5";
			$(location).attr('href',url);
			}
	}else{
		var url="#waterData5";
			$(location).attr('href',url);
		
		}	*/
		
	
	}

//---------------------------------check history date
function checkDateWQ(){
	$(".dateErr").empty();
	/*$("#conTotal").empty();
	$("#conV1").empty();
	$("#conV2").empty();*/
	
	var appDate=$("#appDate").val();
	var sSDate=$("#siteSeDate").val();
	var conSDate=$("#conStDate").val();
	var conEDate=$("#conStDate").val();
	var hODate=$("#HndOvrDate").val();
	
	if(appDate!='' && sSDate!=''){
		if(appDate>sSDate){
			$(".dateErr").text("Check Application Date");
			
		}else{
			var url="#waterData12";
			$(location).attr('href',url);
			} 
	}else{
		var url="#waterData12";
			$(location).attr('href',url);
		}
	
	if(sSDate!='' && conSDate!=''){
		if(sSDate>conSDate){
			$(".dateErr").text("Check site selection Date");
		}else{
			var url="#waterData12";
			$(location).attr('href',url);
			} 
	}else{
		var url="#waterData12";
			$(location).attr('href',url);
		}
	
	if(conSDate!='' && conEDate!=''){
		if(conSDate>conEDate){
			$(".dateErr").text("Check Constraction Start Date");
		}else{
			var url="#waterData12";
			$(location).attr('href',url);
			} 
	}else{
		var url="#waterData12";
			$(location).attr('href',url);
		}
	
	if(conEDate!='' && hODate!=''){	
		if(conEDate>hODate){
			$(".dateErr").text("Check Constraction End Date");
		}else{
			var url="#waterData12";
			$(location).attr('href',url);
			}
	}else{
		var url="#waterData12";
			$(location).attr('href',url);
		}
	
	}

/*function countTotal(){
	var conV1=$("#web_con").val();
	var conV2=$("#comm_con").val();
	
	if(conV1!='' && conV1!=''){
		var conTotal=eval(conV1)+eval(conV2);
		$("#conTotal").text(conTotal);
		
		var url="#waterData12";
		$(location).attr('href',url);
		
	}else{
		var url="#waterData12";
		$(location).attr('href',url);	
		
		}
	
	}*/