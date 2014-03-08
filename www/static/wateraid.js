
//var apipath='http://127.0.0.1:8000/wateraid/syncmobile/';

function test() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude)
	$("#long").val(position.coords.longitude)
	
}

// onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

//var apipath=location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/wateraid/syncmobile/";
var apipath="http://e2.businesssolutionapps.com/wateraid/syncmobile/";

var syncResult='';

$(function(){
	
	$('#syncBasic').click(function() {
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
			//alert("ok");
		$.ajax({
			  url:apipath+'passwordCheck?cid=WAB&mobile='+mobile+'&password='+password,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					if (syncResultArray[0]=='YES'){
					
					planList=syncResultArray[1];
					
					providedBy=syncResultArray[2];
					cboidList=syncResultArray[3];
					
					localStorage.plan_list=planList;
					localStorage.provided_by=providedBy;
					localStorage.cbo_list=cboidList;
					
					
					
					$("#mySync").html("Sync Successful");
					//alert('aa');
					
					$(".planlistDiv").html(localStorage.plan_list);
					$("#providedByDiv").html(localStorage.provided_by);
					$(".cboIdDiv").html(localStorage.cbo_list);
					
					
					/*$('.planlistDiv').empty();
					$('.planlistDiv').append(localStorage.plan_list).trigger('create');*/
					
					var url = "#pagesync";	
					$(location).attr('href',url);
					
					}else{
						$("#mySync").html("check mobile no & password");
						
						}
				
			  }
			});
	});
	
});

$(document).ready(function(){	
	$(".planlistDiv").html(localStorage.plan_list);
	$("#providedByDiv").html(localStorage.provided_by);
	$(".cboIdDiv").html(localStorage.cbo_list);					   

//------------------------safe water -------------					   
	$(".dateErr").empty();
//-------------------------------------/portable
		$("#non_potbl_res").hide();	
	$("#st_non_potable").click(function(){					
		$("#non_potbl_res").show();
	});
	
	$("#st_potable").click(function(){					
		$("#non_potbl_res").hide();
		
	});
	
//-------------------------------------/all test complete
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

//--------------------------check urban acSectorNext
	/*$("#pipe_conc").hide();
	$("#pipe_w_sup").hide();*/

//----------------check test type

var t_type=$("input[name='pota']:checked").val();
if (t_type=="pota"){
		alert("pota");
	}

});
   


//------------------achivement sector next 
function achivementDataPSupport(){
	$(".errorChk").empty();
	var population=$("#population").val();
	var household=$("#household").val();
	var male=$("#male").val();
	var female=$("#female").val();
	var girlsUnder=$("#girlsUnder").val();
	var boysUnder=$("#boysUnder").val();
	var girls=$("#girls").val();
	var boys=$("#boys").val();
	var dapMale=$("#dapMale").val();
	var dapFemale=$("#dapFemale").val();
	var poorC=$("#poorC").val();
	var poorEx=$("#poorEx").val();
	var ethMale=$("#ethMale").val();
	var ethFemale=$("#ethFemale").val();
	
	var totalMF=eval(male)+eval(female);
	var totalPoor=eval(poorC)+eval(poorEx);
	
	
	if(household=="" || male=="" ||  female=="" ||  poorC=="" || poorEx=="" ){
			$(".errorChk").text("field required");
			var url="#achiveDataList";
		}else{
			if(totalMF!=population){
				$(".errorChk").text("Total population total male Female not equal");
				var url="#achiveDataList";
				}
			if(girls>female){
				$(".errorChk").text("Check girls and female");
				var url="#achiveDataList";
				}
			if(boys>male){
				$(".errorChk").text("chk boys and male");
				var url="#achiveDataList";
				}
			if(dapMale>male){
				$(".errorChk").text("chk dap male and male");
				var url="#achiveDataList";
				}
			if(dapFemale>male){
				$(".errorChk").text("chk dapfemale and male");
				var url="#achiveDataList";
				}
			if(totalPoor>population){
				$(".errorChk").text("chk total poor and population");
				var url="#achiveDataList";
				}else{
					$(".errorChk").empty();
					var url="#achiveDataList2";
					
					}
			}
			$(location).attr('href',url);
	
	}


//------------------achivement sector next 
function serviceRecipentNext(){
	$(".errorChk").empty();
	var chk_service_r=$("#service_recepient").val();
	var ser_recpt=$("#ser_recpt").val();
	
	if(chk_service_r=="" && ser_recpt=="" ){
		$(".errorChk").text("select One and set value");
		var url="#achiveDataList2";
		//alert("select sector");
	}else{
		var url="#inPhoto";	
		}
	$(location).attr('href',url);
	
}
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
	
		//var test_type_val=$("input[name='test_type']:checked").val();
		var test_type_val=$("#test_type").val();
	
		if(test_type_val=="pre" || test_type_val=="monitoring" ){
			var url="#waterData2";
		}else{
			var url="#waterData3";
		}
		$(location).attr('href',url);
		
		
	
	};					   


/*function checkUrban(){
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
*/

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

function achiveDataSave(){
		var ach_population=$("#population").val();
		var ach_household=$("#household").val();
		var ach_male=$("#male").val();
		var ach_female=$("#female").val();
		var ach_girlsUnder=$("#girlsUnder").val();
		var ach_boysUnder=$("#boysUnder").val();
		var ach_girls=$("#girls").val();
		var ach_boys=$("#boys").val();
		var ach_dapMale=$("#dapMale").val();
		var ach_dapFemale=$("#dapFemale").val();
		var ach_poorC=$("#poorC").val();
		var ach_poorEx=$("#poorEx").val();
		var ach_ethMale=$("#ethMale").val();
		var ach_ethFemale=$("#ethFemale").val();
		
		var ach_service_recpient=$("#service_recepient").val();
		var ach_ser_rect_val=$("#ser_recpt").val();
		
		localStorage.achPopulation=ach_population
		localStorage.achHousehold=ach_household
		localStorage.achMale=ach_male
		localStorage.achFemale=ach_female
		localStorage.achGirlsUnder=ach_girlsUnder
		localStorage.achBoysUnder=ach_boysUnder
		localStorage.achGirls=ach_girls
		localStorage.achBoys=ach_boys
		localStorage.achDapMale=ach_dapMale
		localStorage.achDapFemale=ach_dapFemale
		localStorage.achPoorC=ach_poorC
		localStorage.achPoorEx=ach_poorEx
		localStorage.achEthMale=ach_ethMale
		localStorage.achEthFemale=ach_ethFemale
		
		localStorage.achServiceRecpt=ach_service_recpient
		localStorage.achSerRecptVal=ach_ser_rect_val
		
		
		//alert(localStorage.achPopulation);
		
		/*var url = "#inPhoto";				
		$(location).attr('href',url);*/
	
	}

function reviseAchiveData(){
		var population=$("#population").val(localStorage.achPopulation);
		var household=$("#household").val(localStorage.achHousehold);
		var male=$("#male").val(localStorage.achMale);
		var female=$("#female").val(localStorage.achFemale);
		var girlsUnder=$("#girlsUnder").val(localStorage.achGirlsUnder);
		var boysUnder=$("#boysUnder").val(localStorage.achBoysUnder);
		var girls=$("#girls").val(localStorage.achGirls);
		var boys=$("#boys").val(localStorage.achBoys);
		var dapMale=$("#dapMale").val(localStorage.achDapMale);
		var dapFemale=$("#dapFemale").val(localStorage.achDapFemale);
		var poorC=$("#poorC").val(localStorage.achPoorC);
		var poorEx=$("#poorEx").val(localStorage.achPoorEx);
		var ethMale=$("#ethMale").val(localStorage.achEthMale);
		var ethFemale=$("#ethFemale").val(localStorage.achEthFemale);
		
		var ethMale=$("#ethMale").val(localStorage.achEthMale);
		var ethFemale=$("#ethFemale").val(localStorage.achEthFemale);
		
		var url = "#planList";				
		$(location).attr('href',url);
	
	}

function achiveData(){
		var ach_population=$("#population").val();
		var ach_household=$("#household").val();
		var ach_male=$("#male").val();
		var ach_female=$("#female").val();
		var ach_girlsUnder=$("#girlsUnder").val();
		var ach_boysUnder=$("#boysUnder").val();
		var ach_girls=$("#girls").val();
		var ach_boys=$("#boys").val();
		var ach_dapMale=$("#dapMale").val();
		var ach_dapFemale=$("#dapFemale").val();
		var ach_poorC=$("#poorC").val();
		var ach_poorEx=$("#poorEx").val();
		var ach_ethMale=$("#ethMale").val();
		var ach_ethFemale=$("#ethFemale").val();
		
		var ach_service_recpient=$("#service_recepient").val();
		var ach_ser_rect_val=$("#ser_recpt").val();
		
		
		
		var achiveData='ach_population='+ach_population+'&ach_household='+ach_household+'&ach_male='+ach_male+'&ach_female='+ach_female+'&ach_girlsUnder='+ach_girlsUnder+'&ach_boysUnder='+ach_boysUnder+'&ach_girls='+ach_girls+'&ach_boys='+ach_boys+'&ach_dapMale='+ach_dapMale+'&ach_dapFemale='+ach_dapFemale+'&ach_poorC='+ach_poorC+'&ach_poorEx='+ach_poorEx+'&ach_ethMale='+ach_ethMale+'&ach_ethFemale='+ach_ethFemale+'&ach_service_recpient='+ach_service_recpient+'&ach_ser_rect_val='+ach_ser_rect_val;
		
		//alert(achiveData);
		/*$.ajax({
				   url:apipath+'achivedata?'achiveData,
				   success: function(result) {
		   
					   if (result=='failed'){
							localStorage.population=population;
							
							var url="#";
							$(location).attr('href',url);
						  
					   }else{
						   $("#").text('Invalid ');
						   //alert("Invalid");
						   }
				   }
		});*/
		
		
	}

function exit() {
navigator.app.exitApp();
}
