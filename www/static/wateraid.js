
var latitude="";
var longitude="";

var latitudewq="";
var longitudewq="";

function getLocationInfoAch() {
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
	$("#checkLocationAch").html("Confirming location. Please wait.");
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	//$("#ach_lat").val("111111")
//	$("#ach_long").val("22222")
	$("#checkLocationAch").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $("#checkLocationAch").html("Failed to Confirmed Location.");
}



function getLocationInfoWq() {
	
	navigator.geolocation.getCurrentPosition(onSuccessWq, onErrorWq);
		
	$("#checkLocationWq").html("Confirming location. Please wait.");
}

// onSuccess Geolocation
function onSuccessWq(position) {
	$("#wq_lat").val(position.coords.latitude);
	$("#wq_long").val(position.coords.longitude);
	//$("#ach_lat").val("111111")
//	$("#ach_long").val("22222")
	$("#checkLocationWq").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onErrorWq(error) {
   $("#wq_lat").val(0);
   $("#wq_long").val(0);
   $("#checkLocationWq").html("Failed to Confirmed Location.");
}



//var apipath=location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/wateraid/syncmobile/";
var apipath="http://e2.businesssolutionapps.com/wateraid/syncmobile/";

var planFlag=0;
var cboFlag=0;
var locationFlag=0;

var syncResult='';
var achPlanId='';
var achPlanActivities='';
var achCBOid='';
var achPopulation='';
var achHousehold='';
var achMale='';
var achFemale='';
var achGirlsUnder='';
var achBoysUnder='';
var achGirls='';
var achBoys='';
var achDapMale='';
var achDapFemale='';
var achPoorC='';
var achPoorEx='';
var achEthMale='';
var achEthFemale='';
var achServiceRecpt='';
var achPhoto='';
var wqPhoto='';
var reviewAchFlag=0; //used for html triger
var reviewAchDisplayFlag=false; //used for save data from review
var arrayId=-1;

$(function(){
	
	$('#syncBasic').click(function() {
						  
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorChk").html("Required mobile no and password");	
		 }else{	
		 //alert(apipath+'passwordCheck?cid=WAB&mobile='+mobile+'&password='+password);
			$.ajax({
			  url:apipath+'passwordCheck?cid=WAB&mobile='+mobile+'&password='+password,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					if (syncResultArray[0]=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.plan_list=syncResultArray[2];
						localStorage.provided_by=syncResultArray[3];
						localStorage.cbo_list=syncResultArray[4];
						localStorage.ser_res_list=syncResultArray[5];
						localStorage.plan_wq=syncResultArray[6];
						localStorage.cbo_id_wq=syncResultArray[7];						
						localStorage.mobile_no=mobile;
						
						$(".errorChk").html("Sync Successful");
						//alert('aa');
						
						
						if (planFlag==0){
							$("#planlistDiv").html(localStorage.plan_list);
							planFlag=1;
						}else{
							$('#planlistDiv').empty();
							$('#planlistDiv').append(localStorage.plan_list).trigger('create');
						}
						
						if (cboFlag==0){
							$("#cboIdDiv").html(localStorage.cbo_list);	
							cboFlag=1;
						}else{
							$('#cboIdDiv').empty();
							$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
						}
						
						if (locationFlag==0){			   
							$("#serResDiv").html(localStorage.ser_res_list);	
							locationFlag=1;
						}else{
							$('#serResDiv').empty();
							$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
						}
						
						/*$("#planlistDiv").html(localStorage.plan_list);					
						$("#cboIdDiv").html(localStorage.cbo_list);
						$("#serResDiv").html(localStorage.ser_res_list);*/
						
						$("#planWqlistDiv").html(localStorage.plan_wq);
						$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
						$("#providedByDiv").html(localStorage.provided_by);
											
						/*$('.planlistDiv').empty();
						$('.planlistDiv').append(localStorage.plan_list).trigger('create');*/
						
						var url = "#pagesync";	
						$(location).attr('href',url);
//						location.reload();
					}
					else {
						
						$(".errorChk").html("Sync Failed. Authorization or Network Error.");
					}
				
			  }//----/success f
			});//------/ajax
		 
		 }//-----/field
			
	});//-----/basic
	
});//------/func

//------------------water aid button click

function waterAidClick(){
	$(".errorChk").text("");
	
	planFlag=0
	cboFlag=0
	locationFlag=0
	
	var url = "#reportType";
	$(location).attr('href',url);
	location.reload();
	
	}
	
$(document).ready(function(){	
	$("#planlistDiv").html(localStorage.plan_list);	
	$("#cboIdDiv").html(localStorage.cbo_list);					   
	$("#serResDiv").html(localStorage.ser_res_list);
	
	$("#planWqlistDiv").html(localStorage.plan_wq);
	$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
	//$("#reviewList").html(localStorage.reviewDataDiv);
	$("#providedByDiv").html(localStorage.provided_by);
	
	$(".errorChk").text("");
	
//-------------------------------date format

//$( "#fstDate" ).datepicker( "option", "dateFormat", "dd/mm/yyyy");
	
//------------------------safe water -------------					   
	$(".dateErr").text("");
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
		$("#pipe_w_sup").hide();		
	
	$("#piped_w_conn_y").click(function(){					
		$("#pipe_w_sup").show();
		
	});
	
	$("#piped_w_conn_n").click(function(){					
		$("#pipe_w_sup").hide();
	});
	/*$("#pipe_conc").hide();
	$("#pipe_w_sup").hide();*/



});



//----------------back button
function backClick(){
	$(".errorChk").text("");
	}

//---------------------report Type list	
function achivementclick(){
	$(".errorChk").text("");
	
	if(localStorage.plan_list==undefined || localStorage.plan_list==""){
		$(".errorChk").text("Required Sync");
	}else{
		if (planFlag==0){
			$("#planlistDiv").html(localStorage.plan_list);
			planFlag=1;
		}else{
			$('#planlistDiv').empty();
			$('#planlistDiv').append(localStorage.plan_list).trigger('create');
		}
		
		if (cboFlag==0){
			$("#cboIdDiv").html(localStorage.cbo_list);	
			cboFlag=1;
		}else{
			$('#cboIdDiv').empty();
			$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
		}
		
		if (locationFlag==0){			   
			$("#serResDiv").html(localStorage.ser_res_list);	
			locationFlag=1;
		}else{
			$('#serResDiv').empty();
			$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
		}
		
		/*$("#planlistDiv").html(localStorage.plan_list);	
		$("#cboIdDiv").html(localStorage.cbo_list);					   
		$("#serResDiv").html(localStorage.ser_res_list);*/
			
		$("#achID").val("");
		
		$("#population").val("");
		$("#household").val("");
		$("#male").val("");
		$("#female").val("");
		$("#girlsUnder").val("");
		$("#boysUnder").val("");
		$("#girls").val("");
		$("#boys").val("");
		$("#dapMale").val("");
		$("#dapFemale").val("");
		$("#poorA").val("");
		$("#poorB").val("");
		$("#poorC").val("");
		$("#poorEx").val("");
		$("#ethMale").val("");
		$("#ethFemale").val("");	
		$("#serRecpent").val("");	
		$("#achPhoto").val("");				
		
		reviewAchDisplayFlag==false;
		arrayId='';
		
		var url = "#planList";
		$(location).attr('href',url);
		//location.reload();
	}
}
	
//------------------------------domain list 
function achDataNext(){
	if($("#planlistDiv").find("input[name='plan_select']:checked").length==0){
		$(".errorChk").text("Required Plan");
	}else{
		var ach_plan_id=$("input[name='plan_select']:checked").val();
		var ach_plan_activities=$("#achActivityName"+ach_plan_id).val();
		
		achPlanId=ach_plan_id;
		achPlanActivities=ach_plan_activities;
		
		$(".errorChk").text("");
		var url = "#achiveDataList";
		$(location).attr('href',url);
	}
}

//-----------------------------achivement data people support
function achivementDataPSupport(){
	$(".errorChk").text("");
	var cbo_id=$("#cbo_combo").val();
	
	var ach_id=$("#achID").val();
	
	
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
	var poorA=$("#poorA").val();
	var poorB=$("#poorB").val();
	var poorC=$("#poorC").val();
	var poorEx=$("#poorEx").val();
	var ethMale=$("#ethMale").val();
	var ethFemale=$("#ethFemale").val();
	
	if(girlsUnder==''){
			girlsUnder=0;
			}
	if(boysUnder==''){
			boysUnder=0;
			}	
	if(girls==''){
			girls=0;
			}
	if(boys==''){
			boys=0;
			}
	if(dapMale==''){
			dapMale=0;
			}
	if(dapFemale==''){
			dapFemale=0;
			}
	if(poorA==''){
			poorA=0;
			}
	if(poorB==''){
			poorB=0;
			}
	if(ethMale==''){
			ethMale=0;
			}
	if(ethFemale==''){
			ethFemale=0;
			}
	
	if (cbo_id=="" ){
		$(".errorChk").text("Required CBO ID ");
	}else if (male=="" ){
		$(".errorChk").text("Required Male ");
	}else if (female=="" ){
		$(".errorChk").text("Required Female ");
	}else if (poorC=="" ){
		$(".errorChk").text("Required Poor C category ");
	}else if (poorEx=="" ){
		$(".errorChk").text("Required Poor D category ");
	}else{
			var totalMF=eval(male)+eval(female);
			var population=eval(population);
			var totalPoor=eval(poorA)+eval(poorB)+eval(poorC)+eval(poorEx);
			
			if(eval(girls)>eval(female)){
				$(".errorChk").text("Check girls and female");
			}else if(eval(boys)>eval(male)){
				$(".errorChk").text("Check boys and male");
			}else if(eval(dapMale)>eval(male)){
				$(".errorChk").text("Check DAP male and male");
			}else if(eval(dapFemale)>eval(female)){
				$(".errorChk").text("Check DAP female and female");
			}else if(totalPoor>population){
				$(".errorChk").text("Check total poor and population");
			}else{
				
				achCBOid=cbo_id
				achID=ach_id
				achPopulation=population
				achHousehold=household
				achMale=male
				achFemale=female
				achGirlsUnder=girlsUnder
				achBoysUnder=boysUnder
				achGirls=girls
				achBoys=boys
				achDapMale=dapMale
				achDapFemale=dapFemale
				achPoorA=poorA
				achPoorB=poorB
				achPoorC=poorC
				achPoorEx=poorEx
				achEthMale=ethMale
				achEthFemale=ethFemale
				
				var ach_plan_id=$("input[name='plan_select']:checked").val();
				//alert(ach_plan_id);
				
				$(".errorChk").text("");
				var url="#achiveDataList2";
				$(location).attr('href',url);
				}
		}
	}
//------------------ show population
function totalPopulation(){
	var male=$("#male").val();
	var female=$("#female").val();
	if(male==''){
			male=0;
			}
	if(female==''){
			female=0;
			}
			
	var totalMF=eval(male)+eval(female);
	
	$("#population").val(totalMF);
	}

//------------------ show Household
function totalhousehold(){
	var poorA=$("#poorA").val();
	
	var poorB=$("#poorB").val();
	var poorC=$("#poorC").val();
	var poorEx=$("#poorEx").val();
	
	if(poorA==''){
			poorA=0;
			}
	if(poorB==''){
			poorB=0;
			}
	if(poorC==''){
			poorC=0;
			}
	if(poorEx==''){
			poorEx=0;
			}
			
	var totalHH=eval(poorA)+eval(poorB)+eval(poorC)+eval(poorEx);
	
	$("#household").val(totalHH);
	}

//------------------achivement sector next 
function serviceRecipentNext(){
	var chk_service_r=$("#serRecpent").val();
	
	
	if(chk_service_r=="" ){
		$(".errorChk").text("Select One");
		var url="#achiveDataList2";
		//alert("select sector");
	}else{
		achServiceRecpt=chk_service_r;
		
		$(".errorChk").text("");
		var url="#inPhoto";	
		}
	$(location).attr('href',url);
	
}

	
//-----------------------------planid,CBO ID, ID, Population, Household,male,Female,girls Under, boys Under,girls,boys,DAP male, DAP Female,Poor A,Poor B ,Poor C, Poor D, Ethnic Male, Ethnic Female, service Recepent, service recepent value
function achiveDataSave(){
		$(".errorChk").text("");
		
		
				
		achivementSave=achPlanId+'fdfd'+achCBOid+'fdfd'+achID+'fdfd'+achPopulation+'fdfd'+achHousehold+'fdfd'+achMale+'fdfd'+achFemale+'fdfd'+achGirlsUnder+'fdfd'+achBoysUnder+'fdfd'+achGirls+'fdfd'+achBoys+'fdfd'+achDapMale+'fdfd'+achDapFemale+'fdfd'+achPoorA+'fdfd'+achPoorB+'fdfd'+achPoorC+'fdfd'+achPoorEx+'fdfd'+achEthMale+'fdfd'+achEthFemale+'fdfd'+achServiceRecpt+'fdfd'+achPlanActivities
		
		if (achPlanId=='' || achCBOid==''){
			$(".errorChk").text("New records not available");
		}else{
			
			achivementStr=localStorage.ach_save;		
			var addFlag=true;			
			
			if (achivementStr==undefined || achivementStr==''){			
				localStorage.ach_save=achivementSave
			}else{
				var achiveSavArray=achivementStr.split('rdrd');
				
				if (reviewAchDisplayFlag==true){					
					if (arrayId ==-1){							
							$(".errorChk").text("Review Index value Error");
					}else{
						achiveSavArray[arrayId]=achivementSave
						
						
						var achTemp="";
						var achTempStr="";
						for (i=0;i<achiveSavArray.length;i++){
							accTemp=achiveSavArray[i]
							
							if (achTempStr==""){
								achTempStr=accTemp
							}else{
								achTempStr=achTempStr+'rdrd'+accTemp
								}
							
						}
						if (achTempStr==""){
							$(".errorChk").text("Review Index Error" );	
						}else{
							localStorage.ach_save=achTempStr;
							}
						
						}
				}else{				
					if (achiveSavArray.length >= 3){
						addFlag=false;					
					}else{
						localStorage.ach_save=achivementStr+'rdrd'+achivementSave
						
					}
				}
			}
			
			if (addFlag==false){
				$(".errorChk").text("Maximum 3 records allowed to be saved for review");		
			}else{
				achPlanId='';
				achID='';
				achCBOid='';
				achPopulation='';
				achHousehold='';
				vachMale='';
				achFemale='';
				achGirlsUnder='';
				achBoysUnder='';
				achGirls='';
				achBoys='';
				achDapMale='';
				achDapFemale='';
				achPoorA='';
				achPoorB='';
				achPoorC='';
				achPoorEx='';
				achEthMale='';
				achEthFemale='';
				
				achServiceRecpt='';
				
				
				//$("input[name='plan_select']:checked").val();
				
				
				//$("#plan_select").'checked'=false;
				//$("#plan_select").prop('checked',false);
				//$("#plan_select").removeAttr("checked");
				
				//$("#cbo_combo").attr('selectedIndex',0);
				//$("#cbo_combo").attr('selected','');
				//$("#cbo_combo").removeAttr("selected");
				
				/*if (planFlag==0){
					$("#planlistDiv").html(localStorage.plan_list);		
				}else{
					$('#planlistDiv').empty();
					$('#planlistDiv').append(localStorage.plan_list).trigger('create');
				}
				
				if (cboFlag==0){
					$("#cboIdDiv").html(localStorage.cbo_list);	
				}else{
					$('#cboIdDiv').empty();
					$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
				}
				
				if (locationFlag==0){			   
					$("#serResDiv").html(localStorage.ser_res_list);		
				}else{
					$('#serResDiv').empty();
					$('#serResDiv').append(localStorage.ser_res_list).trigger('create');	
				}*/
				
				
				$("#achID").val("");
				
				$("#population").val("");
				$("#household").val("");
				$("#male").val("");
				$("#female").val("");
				$("#girlsUnder").val("");
				$("#boysUnder").val("");
				$("#girls").val("");
				$("#boys").val("");
				$("#dapMale").val("");
				$("#dapFemale").val("");
				$("#poorA").val("");
				$("#poorB").val("");
				$("#poorC").val("");
				$("#poorEx").val("");
				$("#ethMale").val("");
				$("#ethFemale").val("");
				
				$("#achPhoto").val("");				
				
				reviewAchDisplayFlag==false;
				arrayId=-1;
				
				
				$(".errorChk").text("Successfully saved for review");				
				
				}
		}
	}

function deleteAchReview(){	
		arrayId=eval($("input[name='achReviewRad']:checked").val());
		
		if (arrayId ==undefined){							
				$(".errorChk").text("Select a Record");
				
		}else{
				var achiveSavArray3=localStorage.ach_save.split('rdrd');
				
				achiveSavArray3.splice(arrayId,1);
				
				var achTemp3="";
				var achTempStr3="";
				for (k=0;k<achiveSavArray3.length;k++){
					accTemp3=achiveSavArray3[k];
					
					if (achTempStr3==""){
						achTempStr3=accTemp3
					}else{
						achTempStr3=achTempStr3+'rdrd'+accTemp3
						}
					
				}				
				localStorage.ach_save=achTempStr3;				
				
				var url = "#reportType";
				$(location).attr('href',url);
				location.reload();
			}
	
	}
//Review Data List
function reviewAchiveData(){
		//listOfReviewData='';
		var achivement=localStorage.ach_save
		
		if (achivement==undefined || achivement==''){
			$(".errorChk").text("Review data not available");
		}else{
			var achivementSaveArray=achivement.split('rdrd');
			
			var achiveSaveCount=achivementSaveArray.length;
			
			var achiveArray=[];
			var reviewDataDiv="";
			var planID="";
			var cboID="";
			var achActivities="";
			
			reviewDataDiv='<ul data-role="listview" data-inset="true"><li class="ui-field-contain"><fieldset data-role="controlgroup">'
			for (i=0;i<achiveSaveCount;i++){
				achiveArray=achivementSaveArray[i].split('fdfd');
				planID=achiveArray[0];
				cboID=achiveArray[1];
				achActivities=achiveArray[20];
				
				reviewDataDiv=reviewDataDiv+'<input type="radio" name="achReviewRad"  id="achReviewRad'+i+'"  value="'+i+'"/> <label for="achReviewRad'+i+'">'+achActivities+'<br/>'+cboID+'</label>'
				
				}
			
			reviewDataDiv=reviewDataDiv+'</fieldset></li></ul>'
			
			if (reviewAchFlag==0){
				$("#reviewAchList").html(reviewDataDiv);
				reviewAchFlag=1;
			}else{
				$('#reviewAchList').empty();
				$('#reviewAchList').append(reviewDataDiv).trigger('create');
				}
			
			//-----------------------------
			if (planFlag==0){
				$("#planlistDiv").html(localStorage.plan_list);
				planFlag=1;
			}else{
				$('#planlistDiv').empty();
				$('#planlistDiv').append(localStorage.plan_list).trigger('create');
			}
			
			if (cboFlag==0){
				$("#cboIdDiv").html(localStorage.cbo_list);	
				cboFlag=1;
			}else{
				$('#cboIdDiv').empty();
				$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
			}
			
			if (locationFlag==0){			   
				$("#serResDiv").html(localStorage.ser_res_list);	
				locationFlag=1;
			}else{
				$('#serResDiv').empty();
				$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
			}
			
			$("#achID").val("");
	
			$("#population").val("");
			$("#household").val("");
			$("#male").val("");
			$("#female").val("");
			$("#girlsUnder").val("");
			$("#boysUnder").val("");
			$("#girls").val("");
			$("#boys").val("");
			$("#dapMale").val("");
			$("#dapFemale").val("");
			$("#poorA").val("");
			$("#poorB").val("");
			$("#poorC").val("");
			$("#poorEx").val("");
			$("#ethMale").val("");
			$("#ethFemale").val("");	
			$("#serRecpent").val("");	
			$("#achPhoto").val("");				
			
			reviewAchDisplayFlag==false;
			arrayId=-1;
			
			
			var url = "#reviewDataList";
			$(location).attr('href',url);
		}	
		
	}

	
function reviewDataNext(){
	reviewAchDisplayFlag=true;
	arrayId=eval($("input[name='achReviewRad']:checked").val());
	
	var achivementRevArray2=localStorage.ach_save.split('rdrd');
	var achRevDetails=achivementRevArray2[arrayId];
	
	var achRevDetailsArray=achRevDetails.split('fdfd');
	
	/*$('#planlistDiv').empty();
	$('#planlistDiv').append(localStorage.plan_list).trigger('create');*/
	
	
	//$("#plan_select").val(achRevDetailsArray[0]).prop('checked',true);
	//$( "input[name='plan_select',value='+achRevDetailsArray[0]+']" ).prop('checked',true);
	
	//$( "input:radio[name=plan_select,value='"+achRevDetailsArray[0]+"']" ).prop('checked',true);
	
	//------------------
	$( "input:radio[name='plan_select'][value='"+achRevDetailsArray[0]+"']" ).attr('checked','checked');
	//$("#plan_select").val(achRevDetailsArray[0])
	
	
	$("#cbo_combo").val(achRevDetailsArray[1]);
	
	$("#achID").val(achRevDetailsArray[2]);				
	$("#population").val(achRevDetailsArray[3]);
	$("#household").val(achRevDetailsArray[4]);
	$("#male").val(achRevDetailsArray[5]);
	$("#female").val(achRevDetailsArray[6]);
	$("#girlsUnder").val(achRevDetailsArray[7]);
	$("#boysUnder").val(achRevDetailsArray[8]);
	$("#girls").val(achRevDetailsArray[9]);
	$("#boys").val(achRevDetailsArray[10]);
	$("#dapMale").val(achRevDetailsArray[11]);
	$("#dapFemale").val(achRevDetailsArray[12]);
	$("#poorA").val(achRevDetailsArray[13]);
	$("#poorB").val(achRevDetailsArray[14]);
	$("#poorC").val(achRevDetailsArray[15]);
	$("#poorEx").val(achRevDetailsArray[16]);
	$("#ethMale").val(achRevDetailsArray[17]);
	$("#ethFemale").val(achRevDetailsArray[18]);
	
	$("#serRecpent").val(achRevDetailsArray[19]);
	
	//$("#photo").val(achRevDetailsArray[20]);
	
	$(".errorChk").text("");
	var url = "#planList";
	$(location).attr('href',url);
}



function achiveDataSubmit(){
		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		achPhoto=$("#achPhoto").val();
		//alert($("#lat").val());
		//latitude=23.8121292;
		//longitude=90.42313;
		
		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		
		
		if(latitude==0 || longitude==0){
			$(".errorChk").text("Please confirm your location ");
		}else{
			
		
		//ach_photo="Data will be submitted. If can not be submitted due to any technical reason it will be saved automatically Data will be submitted. If can not be submitted due to any technical reason it will be saved automatically Data will be submitted. If can not be submitted due to any technical reason it will be saved automatically Data will be submitted. If can not be submitted due to any technical reason it will be saved automatically"
		/*alert(apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&ach_cbo_id='+achCBOid+'&ach_id='+achID+'&ach_population='+achPopulation+'&ach_household='+achHousehold+'&ach_male='+achMale+'&ach_female='+achFemale+'&ach_girlsUnder='+achGirlsUnder+'&ach_boysUnder='+achBoysUnder+'&ach_girls='+achGirls+'&ach_boys='+achBoys+'&ach_dapMale='+achDapMale+'&ach_dapFemale='+achDapFemale+'&ach_poorA='+achPoorA+'&ach_poorB='+achPoorB+'&ach_poorC='+achPoorC+'&ach_poorEx='+achPoorEx+'&ach_ethMale='+achEthMale+'&ach_ethFemale='+achEthFemale+'&ach_service_recpient='+achServiceRecpt+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo=testtesttest');*/
		
			if (achPlanId=='' || achCBOid=='' ){
				$(".errorChk").text("New records not available");
			}else{
				/*alert(apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&ach_cbo_id='+achCBOid+'&ach_id='+achID+'&ach_population='+achPopulation+'&ach_household='+achHousehold+'&ach_male='+achMale+'&ach_female='+achFemale+'&ach_girlsUnder='+achGirlsUnder+'&ach_boysUnder='+achBoysUnder+'&ach_girls='+achGirls+'&ach_boys='+achBoys+'&ach_dapMale='+achDapMale+'&ach_dapFemale='+achDapFemale+'&ach_poorA='+achPoorA+'&ach_poorB='+achPoorB+'&ach_poorC='+achPoorC+'&ach_poorEx='+achPoorEx+'&ach_ethMale='+achEthMale+'&ach_ethFemale='+achEthFemale+'&ach_service_recpient='+achServiceRecpt+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+ach_photo);*/
				
				$.ajax({
						type: 'POST',
						url:apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&ach_cbo_id='+achCBOid+'&ach_id='+achID+'&ach_population='+achPopulation+'&ach_household='+achHousehold+'&ach_male='+achMale+'&ach_female='+achFemale+'&ach_girlsUnder='+achGirlsUnder+'&ach_boysUnder='+achBoysUnder+'&ach_girls='+achGirls+'&ach_boys='+achBoys+'&ach_dapMale='+achDapMale+'&ach_dapFemale='+achDapFemale+'&ach_poorA='+achPoorA+'&ach_poorB='+achPoorB+'&ach_poorC='+achPoorC+'&ach_poorEx='+achPoorEx+'&ach_ethMale='+achEthMale+'&ach_ethFemale='+achEthFemale+'&ach_service_recpient='+achServiceRecpt+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+achPhoto,
						   
						   success: function(result) {
								//alert(result);
							if(result=='Success'){							
								//------------------------
								
								if (reviewAchDisplayFlag==true){					
									if (arrayId ==-1){							
											$(".errorChk").text("Review Index value Error");
									}else{	
											var achiveSavArray2=localStorage.ach_save.split('rdrd');
											//alert(achiveSavArray2.length+','+arrayId);
											achiveSavArray2.splice(arrayId,1);
											
											var achTemp2="";
											var achTempStr2="";
											for (j=0;j<achiveSavArray2.length;j++){
												accTemp2=achiveSavArray2[j];
												
												if (achTempStr2==""){
													achTempStr2=accTemp2
												}else{
													achTempStr2=achTempStr2+'rdrd'+accTemp2
													}
												
											}										
											localStorage.ach_save=achTempStr2;
										}
										
								}
								//----------------
								
								$( "input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
								$("#cbo_combo").val("");
								
								achPlanId="";
								achCBOid="";
								$(".errorChk").text('Successfully Submited');
								//$("#achlocation").val('Successfully Submited');
								$("#achlocation").val(apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&ach_cbo_id='+achCBOid+'&ach_id='+achID+'&ach_population='+achPopulation+'&ach_household='+achHousehold+'&ach_male='+achMale+'&ach_female='+achFemale+'&ach_girlsUnder='+achGirlsUnder+'&ach_boysUnder='+achBoysUnder+'&ach_girls='+achGirls+'&ach_boys='+achBoys+'&ach_dapMale='+achDapMale+'&ach_dapFemale='+achDapFemale+'&ach_poorA='+achPoorA+'&ach_poorB='+achPoorB+'&ach_poorC='+achPoorC+'&ach_poorEx='+achPoorEx+'&ach_ethMale='+achEthMale+'&ach_ethFemale='+achEthFemale+'&ach_service_recpient='+achServiceRecpt+'&latitude='+$("#ach_lat").val()+'&longitude='+$("#ach_long").val()+'&ach_photo='+achPhoto);
							}else{
								$(".errorChk").text('Failed to Submit');	
								}
								
						   }//end result
				});//end ajax
			}
		}//end check location
	}


//=====================================================================================================================Water quality data

var wq_plan_id="";

var wq_CBO_id="";
var test_type_val="";
var provided_by="";
var wq_ref="";
var wq_id="";

var wq_plat_condition="";
var drain_condition="";
var wp_repair="";
var chamber_condition="";
var wq_maintain_by="";
var user_w_payment="";

var wq_depth="";
var wq_static_w_l="";
var wq_first_date="";
var wq_last_date="";
var wq_analysis_date="";

var wq_appDate="";
var wq_handOvrDate="";

var wq_owner_name="";
var wq_owner_phone="";
var wq_caretaker="";
var caretakerPhone="";

var wq_select_tech="";

var wq_pota="";
var wq_delAgua="";
var wq_hach_ez_as="";
var wq_solinity_meter="";
var wq_mn_test_kit="";
var wq_test_kit_lab_test="";
var wq_tst_kit_cloride="";
var wq_tst_kit_oth="";

var wq_ttc_cfu="";
var wq_sl="";
var wq_as_ppb="";
var wq_fe_ng="";
var wq_mn_ppb="";
var wq_chl_ppt="";
var wq_turb_ntu="";
var wq_chlorine="";
var wq_ph="";
var wq_boron="";
var wq_c_bac="";
var wq_odor="";
var wq_nitrate="";
var wq_zinc="";
var wq_condvity="";
var wq_fluoride="";

var wq_tested_at="";
var wq_iron_test="";
var wq_tw_color="";

var sw_option="";
var alt_option="";
var sw_distance="";
var ac_taken="";
var arc_patient="";

var wq_functional="";

var wq_drinking="";
var wq_cooking="";
var wq_washing="";
var wq_Others="";
var wq_all_purpose="";

var wq_potable_status="";
var wq_res_non_potable="";
var wq_no_potable_initiative_taken="";

var wq_wab_con="";
var wq_comm_con="";
var wq_total_cost="";

var wq_is_piped_W_connection="";
var wq_piped_w_sup="";

var wq_all_test_complete="";
var wq_res_n_test="";

var wq_management_committee_exist="";
var wq_management_committee_ori="";
var wq_caretaker_trained="";

var wq_sample_analysis="";

var wq_installation_done="";

var wq_photo="";

var wq_activities="";

var reviewWQDisplayFlag=false;
var reviewWqhFlag=0;



function waterQtyClick(){
	$(".errorChk").text("");
	
	if(localStorage.plan_wq==undefined || localStorage.plan_wq==""){
		$(".errorChk").text("Required Sync");
	}else{
		
		//----------------
		
		
		
		//------------------
		
		var url = "#planListWq";
		$(location).attr('href',url);
		
		
		}
	}
	
function wQLocationNext(){
	
	if($("#planWqlistDiv").find("input[name='plan_select_wq']:checked").length==0){
		$(".errorChk").text("Required Plan");
	}else{
		wq_plan_id=$("input[name='plan_select_wq']:checked").val();
		wq_activities=$("#activityNameWq"+wq_plan_id).val();
		
		$(".errorChk").text("");
		var url = "#waterData";
		$(location).attr('href',url);
	}
}

//---------------------------Water quality data page 

function waterDataNext(){
		wq_CBO_id=$("#wq_cbo_combo").val();
		test_type_val=$("#test_type").val();
		provided_by=$("#providedBy").val();
		
		wq_ref=$("#wq_ref").val();
		wq_id=$("#wq_id").val();
		
		
		if (wq_CBO_id=="" ){
			$(".errorChk").text("Required CBO ID ");
		}else if (test_type_val=="" ){
			$(".errorChk").text("Required Test Type ");
		}else if (provided_by=="" ){
			$(".errorChk").text("Required Provided By ");
		}else{
			
			if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check" ){
					
					$("#ironTest").hide();
					$("#isManagement").hide();
					$("#caretakerTrained").hide();
					var url="#waterData7";
				}else{
					$("#ironTest").show();
					$("#isManagement").show();
					$("#caretakerTrained").show();					
					var url="#waterData2";
				}
								
				$(".errorChk").text("");
				$(location).attr('href',url);
				
			}
	
	};	

//---------------------------Water quality data page 2  



function waterData2Next(){
		wq_plat_condition=$("#plat_condition").val();
		drain_condition=$("#drain_condition").val();
		wp_repair=$("#wp_repair").val();
		chamber_condition=$("#chamber_condition").val();
		
		wq_maintain_by=$("input[name='maintain_by']:checked").val();
		user_w_payment=$("input[name='user_w_payment']:checked").val();
		
		if (wq_maintain_by==undefined ){
			$(".errorChk").text("Required Maitained By ");
		}else if (user_w_payment==undefined ){
			$(".errorChk").text("Required user water payment ");
		}else{	
			var url="#waterData3";
			$(".errorChk").text("");
			$(location).attr('href',url);
		}
	
	};	


//---------------------------Water quality data3 page 

function waterData3Next(){
		wq_depth=$("#depth").val();
		wq_static_w_l=$("#sWaterL").val();
		wq_first_date=$("#fstDate").val();
		wq_last_date=$("#lastDate").val();
		wq_analysis_date=$("#aDate").val();
		
		
		if (wq_depth=="" ){
			$(".errorChk").text("Required Depth ");
		}else if (wq_first_date=="" ){
			$(".errorChk").text("Required First Date ");
		}else if (wq_last_date=="" ){
			$(".errorChk").text("Required Last Date ");
		}else if (wq_analysis_date=="" ){
			$(".errorChk").text("Required Analysis Date ");
		}else{
				
				
				
				$(".errorChk").text("");
				var url="#waterData4";				
				$(location).attr('href',url);
			}
	
	};	

//----------------------------water quality data 4

function waterData4Next(){
		wq_appDate=$("#appDate").val();
		wq_handOvrDate=$("#handOvrDate").val();
		
		if(wq_appDate==""){
			$(".errorChk").text("Required application Date");
		}else if(wq_handOvrDate==""){
			$(".errorChk").text("Required Handover Date");
		}else{
						
			$(".errorChk").text("");
			var url="#waterData5";
			$(location).attr('href',url);
			}
		
}

//---------------------------Water quality data5 page 
function waterData5Next(){
		wq_owner_name=$("#ownerName").val();
		wq_owner_phone=$("#ownerPhone").val();
		
		
		wq_caretaker=$("#caretaker").val();
		caretakerPhone=$("#caretakerPhoneNo").val();
		
		
		$(".errorChk").text("");
		var url="#waterData7";				
		$(location).attr('href',url);
		
	};	

  


//----------------------check waterData6 Next 
	
function waterData6Next(){
	var wq_select_tech=$("#select_tech").val();
		var url="#waterData7";
		
		$(location).attr('href',url);
	}





//---------------------------Water quality data7 page 


function waterData7Next(){
		
		wq_select_tech=$("#select_tech").val();
		
		if($("#typeOfTestKit").find("input[type=checkbox]:checked").length==0){
			$(".errorChk").text("Required Type of Test kit");
		}else{
			wq_pota=$("input[name='pota']:checked").val();
			wq_delAgua=$("input[name='delAgua']:checked").val();
			wq_hach_ez_as=$("input[name='hach_ez_as']:checked").val();
			wq_solinity_meter=$("input[name='solinity_meter']:checked").val();
			wq_mn_test_kit=$("input[name='mn_test_kit']:checked").val();
			wq_test_kit_lab_test=$("input[name='test_kit_lab_test']:checked").val();
			wq_tst_kit_cloride=$("input[name='tst_kit_cloride']:checked").val();
			wq_tst_kit_oth=$("input[name='tst_kit_oth']:checked").val();
			
			
			wq_ttc_cfu=$("#ttc_cfu").val();
			wq_sl=$("#sl").val();
			wq_as_ppb=$("#as_ppb").val();
			wq_fe_ng=$("#fe_ng").val();
			wq_mn_ppb=$("#mn_ppb").val();
			wq_chl_ppt=$("#chl_ppt").val();
			wq_turb_ntu=$("#turb_ntu").val();
			wq_chlorine=$("#chlorine").val();
			wq_ph=$("#ph").val();
			wq_boron=$("#boron").val();
			wq_c_bac=$("#c_bac").val();
			wq_odor=$("#odor").val();
			wq_nitrate=$("#nitrate").val();
			wq_zinc=$("#zinc").val();
			wq_condvity=$("#condvity").val();
			wq_fluoride=$("#fluoride").val();
			
			
			/*if(wq_ttc_cfu==""){
				wq_ttc_cfu=0
				}
			if(wq_sl==""){
				wq_sl=0
				}
			if(wq_as_ppb==""){
				wq_as_ppb=0
				}
			if(wq_fe_ng==""){
				wq_fe_ng=0
				}
			if(wq_mn_ppb==""){
				wq_mn_ppb=0
				}
			if(wq_chl_ppt==""){
				wq_chl_ppt=0
				}
			if(wq_turb_ntu==""){
				wq_turb_ntu=0
				}
			if(wq_chlorine==""){
				wq_chlorine=0
				}
			if(wq_ph==""){
				wq_ph=0
				}
			if(wq_boron==""){
				wq_boron=0
				}
			if(wq_c_bac==""){
				wq_c_bac=0
				}
			if(wq_odor==""){
				wq_odor=0
				}
			if(wq_nitrate==""){
				wq_nitrate=0
				}
			if(wq_zinc==""){
				wq_zinc=0
				}
			if(wq_condvity==""){
				wq_condvity=0
				}
			if(wq_fluoride==""){
				wq_fluoride=0
				}*/
			
			
			
			$(".errorChk").text("");
			var url = "#waterData8";
			$(location).attr('href',url);
		}
		
	};	



//---------------------- waterData8 Next

	
	$("#waterData9").hide();
function waterData8Next(){
		wq_tested_at=$("input[name='tested_at']:checked").val();
		wq_iron_test=$("input[name='iron_test']:checked").val();		
		wq_tw_color=$("input[name='tw_painter']:checked").val();
		
		if(wq_tested_at==undefined){
			$(".errorChk").text("Required Tested At");
		}
		else if(wq_tw_color==undefined){
			$(".errorChk").text("Required TW painter");
		}
		else{
			var iron_test_flag=true;
			
			if(test_type_val=="New Instalation" || test_type_val=="Renovation Instalation"){
				if(wq_iron_test==undefined){
					$(".errorChk").text("Required iron test");
					iron_test_flag=false;
				}
			}
			
			if (iron_test_flag==true){
				if(wq_tw_color=="Red" ){
					var url="#waterData9";
				}else{
					var url="#waterData10";
				}
				$(location).attr('href',url);
				
			}
			
		}
		
	}
	


//----------------------------water quality data 9 

	
function waterData9Next(){
	sw_option=$("input[name='sw_option']:checked").val();
	alt_option=$("input[name='alt_option']:checked").val();
	sw_distance=$("input[name='sw_distance']:checked").val();
	ac_taken=$("input[name='ac_taken']:checked").val();
	arc_patient=$("#arc_patient").val();
	
	if(sw_option==undefined){
			$(".errorChk").text("Required Safe water option");
	}else if(alt_option==undefined){
		$(".errorChk").text("Required alt option");
	}else if(sw_distance==undefined){
		$(".errorChk").text("Required TW safe water distance");
	}else if(ac_taken==undefined){
		$(".errorChk").text("Required action taken");
	}else{
		
		if(arc_patient==""){
			arc_patient=0;
			}
		$(".errorChk").text("");
		var url="#waterData10";
		$(location).attr('href',url);
	}
}


//----------------------------water quality data 10 check


function waterData10Next(){
	//alert("ok");
	wq_functional=$("input[name='functionality']:checked").val();
	
	
	wq_drinking=$("input[name='drinking']:checked").val();
	wq_cooking=$("input[name='cooking']:checked").val();
	wq_washing=$("input[name='washing']:checked").val();
	wq_Others=$("input[name='others']:checked").val();
	wq_all_purpose=$("input[name='all_purpose']:checked").val();
	
	if(wq_functional==undefined){
			$(".errorChk").text("Required functionality");
	}else if($("#useOfChk").find("input[type=checkbox]:checked").length==0){
		$(".errorChk").text("Select One use of");
	}else{
		$(".errorChk").text("");
		var url="#waterData11";
		}
	$(location).attr('href',url);
	}

//----------------------------water quality data 11

		
function waterData11Next(){
	if($("#potableStatus").find("input[name=potable_st]:checked").length==0){
		$(".errorChk").text("Required Potable Status");
	}else{
		wq_potable_status=$("input[name='potable_st']:checked").val();
		wq_res_non_potable=$("#reason_non_potable").val();
		wq_no_potable_initiative_taken=$("#non_potable_ini").val();
		
		if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check" ){
				var url="#waterData13";
			}else{
				var url="#waterData12";
			}		
		$(".errorChk").text("");
		$(location).attr('href',url);
		
	}
	
}

//----------------------------water quality data 12
function waterData12Next(){
		wq_wab_con=$("#wab_con").val();
		wq_comm_con=$("#comm_con").val();
		wq_total_cost=$("#total_cost").val();
		
		wq_is_piped_W_connection=$("input[name='piped_w_conn']:checked").val();
		wq_piped_w_sup=$("#piped_w_sup").val();
		
		if(wq_wab_con==""){
			$(".errorChk").text("Required WAB Contribution");
		}else if(wq_comm_con==""){
			$(".errorChk").text("Required Community Contribution");
		}else if(wq_total_cost==""){
			$(".errorChk").text("Required Total Cost");
		}else if(wq_is_piped_W_connection==undefined){
			$(".errorChk").text("Required is piped water connection");
		}else{
						
			$(".errorChk").text("");
			var url="#waterData13";
			$(location).attr('href',url);
			}
		
}


//----------------------------water quality data 13 




function waterData13Next(){
		wq_all_test_complete=$("input[name='all_test_complt']:checked").val();
		wq_res_n_test=$("#res_n_test").val();
		
		if(wq_all_test_complete==undefined){
			$(".errorChk").text("Required all test complete");
		}else{
			$(".errorChk").text("");
			var url="#waterData14";
			$(location).attr('href',url);
		}
}

//----------------------------water quality data 14 

/*wq_plan_id,wq_CBO_id,test_type_val,provided_by,wq_ref,wq_id,wq_plat_condition,drain_condition,wp_repair,chamber_condition,wq_maintain_by,user_w_payment,wq_depth,wq_static_w_l,wq_first_date,wq_last_date,wq_analysis_date,wq_appDate,wq_handOvrDate,wq_owner_name,wq_owner_phone,wq_caretaker,caretakerPhone,
wq_select_tech,wq_pota,wq_delAgua,wq_hach_ez_as,wq_solinity_meter,wq_mn_test_kit,wq_test_kit_lab_test,wq_tst_kit_oth,wq_ttc_cfu,wq_sl,wq_as_ppb,wq_fe_ng,wq_mn_ppb,wq_chl_ppt,wq_turb_ntu,wq_chlorine,wq_ph,wq_boron,wq_c_bac,wq_odor,wq_nitrate,wq_zinc,wq_condvity,wq_fluoride,wq_tested_at,wq_iron_test,wq_tw_color,sw_option,alt_option,sw_distance,ac_taken,arc_patient,wq_functional,wq_partial,wq_non_functional,wq_drinking,wq_cooking,wq_washing,wq_Others,wq_all_purpose,wq_potable_status,wq_res_non_potable,wq_no_potable_initiative_taken,wq_wab_con,wq_comm_con,wq_total_cost,wq_is_piped_W_connection,wq_piped_w_sup,wq_all_test_complete,wq_res_n_test,wq_management_committee_exist,wq_management_committee_ori,wq_caretaker_trained,wq_sample_analysis,wq_installation_done,wq_photo*/

function WaterQDataSave(){
		$(".errorChk").text("");
		
		wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		wq_management_committee_ori=$("input[name='m_comm_ori_complt']:checked").val();
		wq_caretaker_trained=$("input[name='caretaker_train']:checked").val();
		
		wq_sample_analysis=$("#smpl_analy").val();
		
		wq_installation_done=$("input[name='install_done']:checked").val();
		
		
				
		
		if(wq_installation_done==undefined){
			$(".errorChk").text("Required installation Done");
		}else if(wq_sample_analysis==""){
			$(".errorChk").text("Required Sample Analysis");
		}else{
			
			var management_caretaker_flag=true;
			
			if(test_type_val=="New Instalation" || test_type_val=="Renovation Instalation"){
				if(wq_management_committee_exist==undefined){
					$(".errorChk").text("Required management committee exist");
				}else if(wq_caretaker_trained==undefined){
					$(".errorChk").text("Required caretaker trained");
					management_caretaker_flag=false;
				}
			}
			
			
			if (management_caretaker_flag==true){
		
				if(wq_potable_status=="Potable"){
					$("#reason_non_potable").val("");
					$("#non_potable_ini").val("");
					
					wq_res_non_potable="";
					wq_no_potable_initiative_taken="";
				}
				
				if(wq_all_test_complete=="YES"){
					$("#res_n_test").val("");
					wq_res_n_test="";
					}
							
			
				if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check"){
					
					wq_plat_condition="";
					drain_condition="";
					wp_repair="";
					chamber_condition="";
					wq_maintain_by="";
					user_w_payment="";
					
					wq_depth="";
					wq_static_w_l="";
					wq_first_date="";
					wq_last_date="";
					wq_analysis_date="";
					
					wq_appDate="";
					wq_handOvrDate="";
					
	
					wq_wab_con="";
					wq_comm_con="";
					wq_total_cost="";
					
					wq_is_piped_W_connection="";
					wq_piped_w_sup="";
					
					if(wq_is_piped_W_connection=="NO"){
						$("#piped_w_sup").val("");
						wq_piped_w_sup="";
					}
					
					
					if (wq_iron_test==undefined){
						wq_iron_test="";
						}
				
					if(wq_management_committee_exist==undefined){
						wq_management_committee_exist="";
						}
					
					if(wq_caretaker_trained==undefined){
						wq_caretaker_trained="";
						}
					
					if(wq_management_committee_ori==undefined){
						wq_management_committee_ori="";
						}
					
					
					if(wq_management_committee_exist=="NO"){
						wq_management_committee_ori="";
						$( "input:radio[name='m_comm_ori_complt'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
					}
					
					
					
					$("#plat_condition").val("");
					$("#drain_condition").val("");
					$("#wp_repair").val("");
					$("#chamber_condition").val("");
					
					$( "input:radio[name='maintain_by'][value='"+wq_maintain_by+"']" ).attr('checked','');
					
					
					$("#depth").val("");
					$("#sWaterL").val("");
					$("#fstDate").val("");
					$("#lastDate").val("");
					$("#aDate").val("");
					
					$("#appDate").val("");
					$("#handOvrDate").val("");
					
					
					
					$("#wab_con").val("");
					$("#comm_con").val("");
					$("#total_cost").val("");
					$( "input:radio[name='piped_w_conn'][value='"+wq_is_piped_W_connection+"']" ).attr('checked','');
					$("#piped_w_sup").val("");
				
				}
			}
			
			if(wq_tw_color=="Green" || wq_tw_color=="NA" ){
				
				sw_option="";
				alt_option="";
				sw_distance="";
				ac_taken="";
				
				arc_patient="";
				
				$( "input:radio[name='sw_option'][value='"+sw_option+"']" ).attr('checked','');
				$( "input:radio[name='alt_option'][value='"+alt_option+"']" ).attr('checked','');
				$( "input:radio[name='sw_distance'][value='"+sw_distance+"']" ).attr('checked','');
				$( "input:radio[name='ac_taken'][value='"+ac_taken+"']" ).attr('checked','');
				
				$("#arc_patient").val("");
				
			}
			
			//wq_photo=$("#wq_photo").val(); 
			
			
			waterQualitySave=wq_plan_id+'fdfd'+wq_CBO_id+'fdfd'+test_type_val+'fdfd'+provided_by+'fdfd'+wq_ref+'fdfd'+wq_id+'fdfd'+wq_plat_condition+'fdfd'+drain_condition+'fdfd'+wp_repair+'fdfd'+chamber_condition+'fdfd'+wq_maintain_by+'fdfd'+user_w_payment+'fdfd'+wq_depth+'fdfd'+wq_static_w_l+'fdfd'+wq_first_date+'fdfd'+wq_last_date+'fdfd'+wq_analysis_date+'fdfd'+wq_appDate+'fdfd'+wq_handOvrDate+'fdfd'+wq_owner_name+'fdfd'+wq_owner_phone+'fdfd'+wq_caretaker+'fdfd'+caretakerPhone+'fdfd'+
	wq_select_tech+'fdfd'+wq_pota+'fdfd'+wq_delAgua+'fdfd'+wq_hach_ez_as+'fdfd'+wq_solinity_meter+'fdfd'+wq_mn_test_kit+'fdfd'+wq_test_kit_lab_test+'fdfd'+wq_tst_kit_cloride+'fdfd'+wq_tst_kit_oth+'fdfd'+wq_ttc_cfu+'fdfd'+wq_sl+'fdfd'+wq_as_ppb+'fdfd'+wq_fe_ng+'fdfd'+wq_mn_ppb+'fdfd'+wq_chl_ppt+'fdfd'+wq_turb_ntu+'fdfd'+wq_chlorine+'fdfd'+wq_ph+'fdfd'+wq_boron+'fdfd'+wq_c_bac+'fdfd'+wq_odor+'fdfd'+wq_nitrate+'fdfd'+wq_zinc+'fdfd'+wq_condvity+'fdfd'+wq_fluoride+'fdfd'+wq_tested_at+'fdfd'+wq_iron_test+'fdfd'+wq_tw_color+'fdfd'+sw_option+'fdfd'+alt_option+'fdfd'+sw_distance+'fdfd'+ac_taken+'fdfd'+arc_patient+'fdfd'+wq_functional+'fdfd'+wq_drinking+'fdfd'+wq_cooking+'fdfd'+wq_washing+'fdfd'+wq_Others+'fdfd'+wq_all_purpose+'fdfd'+wq_potable_status+'fdfd'+wq_res_non_potable+'fdfd'+wq_no_potable_initiative_taken+'fdfd'+wq_wab_con+'fdfd'+wq_comm_con+'fdfd'+wq_total_cost+'fdfd'+wq_is_piped_W_connection+'fdfd'+wq_piped_w_sup+'fdfd'+wq_all_test_complete+'fdfd'+wq_res_n_test+'fdfd'+wq_management_committee_exist+'fdfd'+wq_management_committee_ori+'fdfd'+wq_caretaker_trained+'fdfd'+wq_sample_analysis+'fdfd'+wq_installation_done+'fdfd'+wq_photo+'fdfd'+wq_activities
	
			//alert(waterQualitySave);
			
			if (wq_plan_id=='' || wq_CBO_id==''){
				$(".errorChk").text("New records not available");			
			}else{
				
				waterQStr=localStorage.water_q_save;		
				var addFlag=true;			
				
				if (waterQStr==undefined || waterQStr==''){			
					localStorage.water_q_save=waterQualitySave
				}else{
					var waterQSavArray=waterQStr.split('rdrd');
					
					if (reviewWQDisplayFlag==true){					
						if (arrayIdWq ==-1){							
								$(".errorChk").text("Review Index value Error");
						}else{
							waterQSavArray[arrayIdWq]=waterQualitySave
							
							var wqTemp="";
							var wqTempStr="";
							for (i=0;i<waterQSavArray.length;i++){
								wqqTemp=waterQSavArray[i]
								
								if (wqTempStr==""){
									wqTempStr=wqqTemp
								}else{
									wqTempStr=wqTempStr+'rdrd'+wqqTemp
									}
								
							}
							if (wqTempStr==""){
								$(".errorChk").text("Review Index Error" );	
							}else{
								localStorage.water_q_save=wqTempStr;
								}
							
							}
					}else{				
						if (waterQSavArray.length >= 3){
							addFlag=false;					
						}else{
							localStorage.water_q_save=waterQStr+'rdrd'+waterQualitySave
							
						}
					}
				}
				
				if (addFlag==false){
					$(".errorChk").text("Maximum 3 records allowed to be saved for review");		
				}else{
					wq_plan_id="";
					wq_CBO_id=="";
					
					reviewWQDisplayFlag==false;
					arrayIdWq=-1;
					
					$(".errorChk").text("Successfully saved for review");				
					//location.reload();
					}
			}
	}
}

function deleteWqReview(){	
		arrayIdWq=eval($("input[name='wqReviewRad']:checked").val());
		
		if (arrayIdWq ==undefined){							
				$(".errorChk").text("Select a Record");
				
		}else{
				var waterqSavArray3=localStorage.water_q_save.split('rdrd');
				
				waterqSavArray3.splice(arrayIdWq,1);
				
				var wqTemp3="";
				var wqTempStr3="";
				for (n=0;n<waterqSavArray3.length;n++){
					wqTemp3=waterqSavArray3[n];
					
					if (wqTempStr3==""){
						wqTempStr3=wqTemp3
					}else{
						wqTempStr3=wqTempStr3+'rdrd'+wqTemp3
						}
					
				}				
				localStorage.water_q_save=wqTempStr3;				
				
				var url = "#reportType";
				$(location).attr('href',url);
				location.reload();
			}
	
	}
//Review Data List Water Quality
function reviewWaterQData(){
		//listOfReviewData='';
		var waterQuality=localStorage.water_q_save
		
		if (waterQuality==undefined || waterQuality==''){
			$(".errorChk").text("Review data not available");
		}else{
			var waterQSaveArray=waterQuality.split('rdrd');
			
			var waterSaveCount=waterQSaveArray.length;
			
			var wqArray=[];
			var reviewWqDataDiv="";
			var planIDWq="";
			var cboIDWq="";
			var WqActivities="";
			
			reviewWqDataDiv='<ul data-role="listview" data-inset="true"><li class="ui-field-contain"><fieldset data-role="controlgroup">'
			for (m=0;m<waterSaveCount;m++){
				wqArray=waterQSaveArray[m].split('fdfd');
				//planIDWq=wqArray[0];
				cboIDWq=wqArray[1];
				WqActivities=wqArray[78];
				
				reviewWqDataDiv=reviewWqDataDiv+'<input type="radio" name="wqReviewRad"  id="wqReviewRad'+m+'"  value="'+m+'"/> <label for="wqReviewRad'+m+'">'+planIDWq+'<br/>'+cboIDWq+'<br/>'+WqActivities+'</label>'
				
				}
			
			reviewWqDataDiv=reviewWqDataDiv+'</fieldset></li></ul>'
			
			if (reviewWqhFlag==0){
				$("#reviewWqList").html(reviewWqDataDiv);
				reviewWqhFlag=1;
			}else{
				$('#reviewWqList').empty();
				$('#reviewWqList').append(reviewWqDataDiv).trigger('create');
				}
			
			//-----------------------------
			reviewWQDisplayFlag==false;
			arrayIdWq=-1;
			
			$(".errorChk").text("");
			var url = "#reviewWqDataList";
			$(location).attr('href',url);
			
		}	
		
	}

	
function reviewWqDataNext(){
	if($("#reviewWqList").find("input[name=wqReviewRad]:checked").length==0){
		$(".errorChk").text("Select a Record");
	}else{
	
		reviewWQDisplayFlag=true;
		arrayIdWq=eval($("input[name='wqReviewRad']:checked").val());
		
		
		
		var waterQRevArray2=localStorage.water_q_save.split('rdrd');
		var waterQRevDetails=waterQRevArray2[arrayIdWq];
		
		var waterQRevDetailsArray=waterQRevDetails.split('fdfd');
		
		
		/*$('#planlistDiv').empty();
		$('#planlistDiv').append(localStorage.plan_list).trigger('create');*/
		
		
		//$("#plan_select").val(achRevDetailsArray[0]).prop('checked',true);
		//$( "input[name='plan_select',value='+achRevDetailsArray[0]+']" ).prop('checked',true);
		
		//$( "input:radio[name=plan_select,value='"+achRevDetailsArray[0]+"']" ).prop('checked',true);
		
		//------------------
		$( "input:radio[name='plan_select_wq'][value='"+waterQRevDetailsArray[0]+"']" ).attr('checked','checked');
		//$("#plan_select").val(achRevDetailsArray[0])
		
		$("#wq_cbo_combo").val(waterQRevDetailsArray[1]);
		$("#test_type").val(waterQRevDetailsArray[2]);
		$("#providedBy").val(waterQRevDetailsArray[3]);
		
		$("#wq_ref").val(waterQRevDetailsArray[4]);
		$("#wq_id").val(waterQRevDetailsArray[5]);
		//---------------------------------------------------
		$("#plat_condition").val(waterQRevDetailsArray[6]);
		$("#drain_condition").val(waterQRevDetailsArray[7]);
		$("#wp_repair").val(waterQRevDetailsArray[8]);
		$("#chamber_condition").val(waterQRevDetailsArray[9]);
		
		$( "input:radio[name='maintain_by'][value='"+waterQRevDetailsArray[10]+"']" ).attr('checked','checked');
		$( "input:radio[name='user_w_payment'][value='"+waterQRevDetailsArray[11]+"']" ).attr('checked','checked');
		//---------------------------------------------------------------------------------------------------------------
		
		$("#depth").val(waterQRevDetailsArray[12]);
		$("#sWaterL").val(waterQRevDetailsArray[13]);
		$("#fstDate").val(waterQRevDetailsArray[14]);
		$("#lastDate").val(waterQRevDetailsArray[15]);
		$("#aDate").val(waterQRevDetailsArray[16]);
		
		$("#appDate").val(waterQRevDetailsArray[17]);
		$("#handOvrDate").val(waterQRevDetailsArray[18]);
		//------------------------------------------------------------
		$("#ownerName").val(waterQRevDetailsArray[19]);
		$("#ownerPhone").val(waterQRevDetailsArray[20]);		
		$("#caretaker").val(waterQRevDetailsArray[21]);
		$("#caretakerPhoneNo").val(waterQRevDetailsArray[22]);
		
		$("#select_tech").val(waterQRevDetailsArray[23]);
		
		$( "input:checkbox[name='pota'][value='"+waterQRevDetailsArray[24]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='delAgua'][value='"+waterQRevDetailsArray[25]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='hach_ez_as'][value='"+waterQRevDetailsArray[26]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='solinity_meter'][value='"+waterQRevDetailsArray[27]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='mn_test_kit'][value='"+waterQRevDetailsArray[28]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='test_kit_lab_test'][value='"+waterQRevDetailsArray[29]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='tst_kit_cloride'][value='"+waterQRevDetailsArray[30]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='tst_kit_oth'][value='"+waterQRevDetailsArray[31]+"']" ).attr('checked','checked');
		
		
		$("#ttc_cfu").val(waterQRevDetailsArray[32]);
		$("#sl").val(waterQRevDetailsArray[33]);
		$("#as_ppb").val(waterQRevDetailsArray[34]);
		$("#fe_ng").val(waterQRevDetailsArray[35]);
		$("#mn_ppb").val(waterQRevDetailsArray[36]);
		$("#chl_ppt").val(waterQRevDetailsArray[37]);
		$("#turb_ntu").val(waterQRevDetailsArray[38]);
		$("#chlorine").val(waterQRevDetailsArray[39]);
		$("#ph").val(waterQRevDetailsArray[40]);
		$("#boron").val(waterQRevDetailsArray[41]);
		$("#c_bac").val(waterQRevDetailsArray[42]);
		$("#odor").val(waterQRevDetailsArray[43]);
		$("#nitrate").val(waterQRevDetailsArray[44]);
		$("#zinc").val(waterQRevDetailsArray[45]);
		$("#condvity").val(waterQRevDetailsArray[46]);
		$("#fluoride").val(waterQRevDetailsArray[47]);
		
		$( "input:radio[name='tested_at'][value='"+waterQRevDetailsArray[48]+"']" ).attr('checked','checked');
		$( "input:radio[name='iron_test'][value='"+waterQRevDetailsArray[49]+"']" ).attr('checked','checked');
		$( "input:radio[name='tw_painter'][value='"+waterQRevDetailsArray[50]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='sw_option'][value='"+waterQRevDetailsArray[51]+"']" ).attr('checked','checked');
		$( "input:radio[name='alt_option'][value='"+waterQRevDetailsArray[52]+"']" ).attr('checked','checked');
		$( "input:radio[name='sw_distance'][value='"+waterQRevDetailsArray[53]+"']" ).attr('checked','checked');
		$( "input:radio[name='ac_taken'][value='"+waterQRevDetailsArray[54]+"']" ).attr('checked','checked');
		
		$("#arc_patient").val(waterQRevDetailsArray[55]);
		
		$( "input:radio[name='functionality'][value='"+waterQRevDetailsArray[56]+"']" ).attr('checked','checked');
		
		$( "input:checkbox[name='drinking'][value='"+waterQRevDetailsArray[57]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='cooking'][value='"+waterQRevDetailsArray[58]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='washing'][value='"+waterQRevDetailsArray[59]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='others'][value='"+waterQRevDetailsArray[60]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='all_purpose'][value='"+waterQRevDetailsArray[61]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='potable_st'][value='"+waterQRevDetailsArray[62]+"']" ).attr('checked','checked');
		
		$("#reason_non_potable").val(waterQRevDetailsArray[63]);
		$("#non_potable_ini").val(waterQRevDetailsArray[64]);
		
		$("#wab_con").val(waterQRevDetailsArray[65]);
		$("#comm_con").val(waterQRevDetailsArray[66]);
		$("#total_cost").val(waterQRevDetailsArray[67]);
		
		$( "input:radio[name='piped_w_conn'][value='"+waterQRevDetailsArray[68]+"']" ).attr('checked','checked');
		$("#piped_w_sup").val(waterQRevDetailsArray[69]);
		
		$( "input:radio[name='all_test_complt'][value='"+waterQRevDetailsArray[70]+"']" ).attr('checked','checked');
		$("#res_n_test").val(waterQRevDetailsArray[71]);
		
		$( "input:radio[name='m_comm_ext'][value='"+waterQRevDetailsArray[72]+"']" ).attr('checked','checked');
		$( "input:radio[name='m_comm_ori_complt'][value='"+waterQRevDetailsArray[73]+"']" ).attr('checked','checked');
		$( "input:radio[name='caretaker_train'][value='"+waterQRevDetailsArray[74]+"']" ).attr('checked','checked');
		
		
		$("#smpl_analy").val(waterQRevDetailsArray[75]);
		
		$( "input:radio[name='install_done'][value='"+waterQRevDetailsArray[76]+"']" ).attr('checked','checked');
		
		
		//-------------------------------------show
		var chk_potable_st=$("input[name='potable_st']:checked").val();
		
		if(chk_potable_st=="Non Potable"){
			$("#non_potbl_res").show();
		}else{
			$("#non_potbl_res").hide();
			}
		
		var chk_all_test_complete=$("input[name='all_test_complt']:checked").val();
		
		if(chk_all_test_complete=="NO"){
			$("#all_test_n_res").show();
		}else{
			$("#all_test_n_res").hide();
			}
		
		var chk_wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		
		if(chk_wq_management_committee_exist=="YES"){
			$("#m_comm_ori").show();
		}else{
			$("#m_comm_ori").hide();
			}	
		
		var chk_wq_is_piped_W_connection=$("input[name='piped_w_conn']:checked").val();
		
		if(chk_wq_is_piped_W_connection=="YES"){
			$("#pipe_w_sup").show();
		}else{
			$("#pipe_w_sup").hide();
		}
		
		$(".errorChk").text("");
		var url = "#planListWq";
	}
	
	$(location).attr('href',url);
}


function waterQDataSubmit(){
		
		latitudewq=$("#wq_lat").val();
		longitudewq=$("#wq_long").val();
		
		
		if (latitudewq==undefined || latitudewq==''){
			latitude=0;
			}
		if (longitudewq==undefined || longitudewq==''){
			longitudewq=0;
			}
		
		wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		wq_management_committee_ori=$("input[name='m_comm_ori_complt']:checked").val();
		wq_caretaker_trained=$("input[name='caretaker_train']:checked").val();
		
		wq_sample_analysis=$("#smpl_analy").val();
		
		wq_installation_done=$("input[name='install_done']:checked").val();
		
		
		 if(wq_sample_analysis==""){
			$(".errorChk").text("Required Sample Analysis");
		}else if(wq_installation_done==undefined){
			$(".errorChk").text("Required installation Done");
		}else{
			 var management_caretaker_flag=true;
			
			if(test_type_val=="New Instalation" || test_type_val=="Renovation Instalation"){
				if(wq_management_committee_exist==undefined){
					$(".errorChk").text("Required management committee exist");
				}else if(wq_caretaker_trained==undefined){
					$(".errorChk").text("Required caretaker trained");
					management_caretaker_flag=false;
				}
			}
			
			
		if (management_caretaker_flag==true){
			
			if(wq_potable_status=="Potable"){
				$("#reason_non_potable").val("");
				$("#non_potable_ini").val("");
				
				wq_res_non_potable="";
				wq_no_potable_initiative_taken="";
			}
			
			if(wq_all_test_complete=="YES"){
				$("#res_n_test").val("");
				wq_res_n_test="";
				}
			
		
			if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check"){
				
				wq_plat_condition="";
				drain_condition="";
				wp_repair="";
				chamber_condition="";
				wq_maintain_by="";
				user_w_payment="";
				
				wq_depth="";
				wq_static_w_l="";
				wq_first_date="";
				wq_last_date="";
				wq_analysis_date="";
				
				wq_appDate="";
				wq_handOvrDate="";
				
				
				
				
				
				wq_wab_con="";
				wq_comm_con="";
				wq_total_cost="";
				
				wq_is_piped_W_connection="";
				wq_piped_w_sup="";
				
				if(wq_is_piped_W_connection=="NO"){
					$("#piped_w_sup").val("");
					wq_piped_w_sup="";
				}
				
				if (wq_iron_test==undefined){
					wq_iron_test="";
					}
				
				if(wq_management_committee_exist==undefined){
					wq_management_committee_exist="";
					}
				
				if(wq_caretaker_trained==undefined){
					wq_caretaker_trained="";
					}
				
				if(wq_management_committee_ori==undefined){
					wq_management_committee_ori="";
					}
				
				
				if(wq_management_committee_exist=="NO"){
					wq_management_committee_ori="";
					$( "input:radio[name='m_comm_ori_complt'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
				}
				
				$("#plat_condition").val("");
				$("#drain_condition").val("");
				$("#wp_repair").val("");
				$("#chamber_condition").val("");
				
				$( "input:radio[name='maintain_by'][value='"+wq_maintain_by+"']" ).attr('checked','');
				$( "input:radio[name='user_w_payment'][value='"+user_w_payment+"']" ).attr('checked','');
				
				$("#depth").val("");
				$("#sWaterL").val("");
				$("#fstDate").val("");
				$("#lastDate").val("");
				$("#aDate").val("");
				
				$("#appDate").val("");
				$("#handOvrDate").val("");
				
				$("#wab_con").val("");
				$("#comm_con").val("");
				$("#total_cost").val("");
				$( "input:radio[name='piped_w_conn'][value='"+wq_is_piped_W_connection+"']" ).attr('checked','');
				$("#piped_w_sup").val("");
			}
			
			if(wq_tw_color=="Green" || wq_tw_color=="NA" ){
				
				sw_option="";
				alt_option="";
				sw_distance="";
				ac_taken="";
				
				arc_patient="";
				
				$( "input:radio[name='sw_option'][value='"+sw_option+"']" ).attr('checked','');
				$( "input:radio[name='alt_option'][value='"+alt_option+"']" ).attr('checked','');
				$( "input:radio[name='sw_distance'][value='"+sw_distance+"']" ).attr('checked','');
				$( "input:radio[name='ac_taken'][value='"+ac_taken+"']" ).attr('checked','');
				
				$("#arc_patient").val("");
				
			}
		}
		
		//----------- Test Kit chkbox
		var testKitChk="";
		if (wq_pota!="" && wq_pota!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_pota
				}else{
					testKitChk+=","+wq_pota
					}
		}
		if (wq_delAgua!="" && wq_delAgua!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_delAgua
				}else{
					testKitChk+=","+wq_delAgua
					}
		}
		if (wq_hach_ez_as!="" && wq_hach_ez_as!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_hach_ez_as
				}else{
					testKitChk+=","+wq_hach_ez_as
					}
		}
		if (wq_solinity_meter!="" && wq_solinity_meter!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_solinity_meter
				}else{
					testKitChk+=","+wq_solinity_meter
					}
		}
		if (wq_mn_test_kit!="" && wq_mn_test_kit!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_mn_test_kit
				}else{
					testKitChk+=","+wq_mn_test_kit
					}
		}
		if (wq_test_kit_lab_test!="" && wq_test_kit_lab_test!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_test_kit_lab_test
				}else{
					testKitChk+=","+wq_test_kit_lab_test
					}
		}
		if (wq_tst_kit_cloride!="" && wq_tst_kit_cloride!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_tst_kit_cloride
				}else{
					testKitChk+=","+wq_tst_kit_cloride
					}
		}
		if (wq_tst_kit_oth!="" && wq_tst_kit_oth!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_tst_kit_oth
				}else{
					testKitChk+=","+wq_tst_kit_oth
					}
		}
			
		
		
		
		var useOfChk="";
		if (wq_drinking!="" && wq_drinking!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_drinking
				}else{
					useOfChk=useOfChk+","+wq_drinking
					}
		}
		if (wq_cooking!="" && wq_cooking!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_cooking
				}else{
					useOfChk=useOfChk+","+wq_cooking
					}
		}
		if (wq_washing!="" && wq_washing!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_washing
				}else{
					useOfChk=useOfChk+","+wq_washing
					}
		}
		if (wq_Others!="" && wq_Others!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_Others
				}else{
					useOfChk=useOfChk+","+wq_Others
					}
		}
		if (wq_all_purpose!="" && wq_all_purpose!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_all_purpose
				}else{
					useOfChk=useOfChk+","+wq_all_purpose
					}
		}
		
		wq_photo=$("#wq_photo").val();
		
/*	
alert(apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&test_type_val='+test_type_val+'&provided_by='+provided_by+'&wq_ref='+wq_ref+'&wq_id='+wq_id+'&wq_plat_condition='+wq_plat_condition+'&drain_condition='+drain_condition+'&wp_repair='+wp_repair+'&chamber_condition='+chamber_condition+'&wq_maintain_by='+wq_maintain_by+'&user_w_payment='+user_w_payment+'&wq_depth='+wq_depth+'&wq_static_w_l='+wq_static_w_l+'&wq_first_date='+wq_first_date+'&wq_last_date='+wq_last_date+'&wq_analysis_date='+wq_analysis_date+'&wq_appDate='+wq_appDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+wq_owner_name+'&wq_owner_phone='+wq_owner_phone+'&wq_caretaker='+wq_caretaker+'&caretakerPhone='+caretakerPhone+'&wq_select_tech='+
wq_select_tech+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_sl='+wq_sl+'&wq_as_ppb='+wq_as_ppb+'&wq_fe_ng='+wq_fe_ng+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_turb_ntu='+wq_turb_ntu+'&wq_chlorine='+wq_chlorine+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_c_bac='+wq_c_bac+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fluoride='+wq_fluoride+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+sw_option+'&alt_option='+alt_option+'&sw_distance='+sw_distance+'&ac_taken='+ac_taken+'&arc_patient='+arc_patient+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+wq_res_non_potable+'&wq_no_potable_initiative_taken='+wq_no_potable_initiative_taken+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_piped_w_sup='+wq_piped_w_sup+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+wq_res_n_test+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_sample_analysis='+wq_sample_analysis+'&wq_installation_done='+wq_installation_done+'&latitude='+latitude+'&longitude='+longitude+'&wq_photo='+wq_photo);
*/
		
if(latitudewq==0 || longitudewq==0){
		$(".errorChk").text("Please confirm your location");
	}else{
		
		if (wq_plan_id=='' || wq_CBO_id==''){
			$(".errorChk").text("New records not available");
		}else{
			
			$.ajax({
				   	type: 'POST',
					url:apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&test_type_val='+test_type_val+'&provided_by='+provided_by+'&wq_ref='+wq_ref+'&wq_id='+wq_id+'&wq_plat_condition='+wq_plat_condition+'&drain_condition='+drain_condition+'&wp_repair='+wp_repair+'&chamber_condition='+chamber_condition+'&wq_maintain_by='+wq_maintain_by+'&user_w_payment='+user_w_payment+'&wq_depth='+wq_depth+'&wq_static_w_l='+wq_static_w_l+'&wq_first_date='+wq_first_date+'&wq_last_date='+wq_last_date+'&wq_analysis_date='+wq_analysis_date+'&wq_appDate='+wq_appDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+wq_owner_name+'&wq_owner_phone='+wq_owner_phone+'&wq_caretaker='+wq_caretaker+'&caretakerPhone='+caretakerPhone+'&wq_select_tech='+
wq_select_tech+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_sl='+wq_sl+'&wq_as_ppb='+wq_as_ppb+'&wq_fe_ng='+wq_fe_ng+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_turb_ntu='+wq_turb_ntu+'&wq_chlorine='+wq_chlorine+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_c_bac='+wq_c_bac+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fluoride='+wq_fluoride+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+sw_option+'&alt_option='+alt_option+'&sw_distance='+sw_distance+'&ac_taken='+ac_taken+'&arc_patient='+arc_patient+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+wq_res_non_potable+'&wq_no_potable_initiative_taken='+wq_no_potable_initiative_taken+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_piped_w_sup='+wq_piped_w_sup+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+wq_res_n_test+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_sample_analysis='+wq_sample_analysis+'&wq_installation_done='+wq_installation_done+'&latitude='+latitudewq+'&longitude='+longitudewq+'&wq_photo='+wq_photo,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//------------------------							
							if (reviewWQDisplayFlag==true){					
								if (arrayIdWq ==-1){							
										$(".errorChk").text("Review Index value Error");
								}else{	
									var waterSavArray2=localStorage.water_q_save.split('rdrd');
										//alert(achiveSavArray2.length+','+arrayId);
										waterSavArray2.splice(arrayIdWq,1);
										
										var wqTemp2="";
										var wqTempStr2="";
										for (p=0;p<waterSavArray2.length;p++){
											wqTemp2=waterSavArray2[p];
											
											if (wqTempStr2==""){
												wqTempStr2=wqTemp2
											}else{
												wqTempStr2=wqTempStr2+'rdrd'+wqTemp2
												}
											
										}
										//alert(achiveSavArray2.length+','+arrayId);
										//alert(achTempStr2);
										localStorage.water_q_save=wqTempStr2;
									}
									
							}
							//----------------
							
							$( "input:radio[name='plan_select_wq'][value='"+wq_plan_id+"']" ).attr('checked','');
							$("#wq_cbo_combo").val("");
							
							wq_plan_id="";
							wq_CBO_id="";
							
							$(".errorChk").text('Successfully Submited');
						}else{
							$(".errorChk").text('Failed to Submit');	
							}
						
						$("#wqLocation").val(apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&test_type_val='+test_type_val+'&provided_by='+provided_by+'&wq_ref='+wq_ref+'&wq_id='+wq_id+'&wq_plat_condition='+wq_plat_condition+'&drain_condition='+drain_condition+'&wp_repair='+wp_repair+'&chamber_condition='+chamber_condition+'&wq_maintain_by='+wq_maintain_by+'&user_w_payment='+user_w_payment+'&wq_depth='+wq_depth+'&wq_static_w_l='+wq_static_w_l+'&wq_first_date='+wq_first_date+'&wq_last_date='+wq_last_date+'&wq_analysis_date='+wq_analysis_date+'&wq_appDate='+wq_appDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+wq_owner_name+'&wq_owner_phone='+wq_owner_phone+'&wq_caretaker='+wq_caretaker+'&caretakerPhone='+caretakerPhone+'&wq_select_tech='+
wq_select_tech+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_sl='+wq_sl+'&wq_as_ppb='+wq_as_ppb+'&wq_fe_ng='+wq_fe_ng+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_turb_ntu='+wq_turb_ntu+'&wq_chlorine='+wq_chlorine+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_c_bac='+wq_c_bac+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fluoride='+wq_fluoride+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+sw_option+'&alt_option='+alt_option+'&sw_distance='+sw_distance+'&ac_taken='+ac_taken+'&arc_patient='+arc_patient+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+wq_res_non_potable+'&wq_no_potable_initiative_taken='+wq_no_potable_initiative_taken+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_piped_w_sup='+wq_piped_w_sup+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+wq_res_n_test+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_sample_analysis='+wq_sample_analysis+'&wq_installation_done='+wq_installation_done+'&latitude='+latitudewq+'&longitude='+longitudewq+'&wq_photo='+wq_photo)
						
						 	/*reviewAchDisplayFlag==false;
							arrayId='';*/
							   //alert("Invalid");
						   }
				});
			
			}
		}
	}
}


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


function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}

function showLatLong(){
	alert ($("#ach_lat").val());
	}

// ----------------Camera-----------------------------------------------

//Acheivement
function getAchivementImage() {
	$("#achPhoto").val("taking Achivement Photo");
	navigator.camera.getPicture(onSuccessAchivement, onFailAchivement, { quality: 30,
	    destinationType: Camera.DestinationType.DATA_URL
	});
}

function onSuccessAchivement(imageData) {
//  var image = document.getElementById('myImage');
//  image.src = "data:image/jpeg;base64," + imageData;
  $("#achPhoto").val(imageData);
}

function onFailAchivement(message) {
  alert('Failed because: ' + message);
}


//Water
function getWaterImage() {
	$("#wq_photo").val("Take Water Quality Photo");
	navigator.camera.getPicture(onSuccessWater, onFailWater, { quality: 30,
	    destinationType: Camera.DestinationType.DATA_URL
	});
}

function onSuccessWater(imageData) {
//  var image = document.getElementById('myImage');
//  image.src = "data:image/jpeg;base64," + imageData;
	$("#wq_photo").val(imageData);
}

function onFailWater(message) {
  alert('Failed because: ' + message);
}