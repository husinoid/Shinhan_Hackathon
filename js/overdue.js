var amt = 0;
function totalSum(id, num) {
		if($("#foreignSelect" + num).is(":checked")) {
			amt += parseInt($("#foreign"+num).val());
		} else {
			amt -= parseInt($("#foreign"+num).val());
		}
		$("#overdueAmt").html("총 " + comma(amt) + "원");
}
function getCardfee(nxtQyKey) {
	   $.ajax({
	      url : "/usecard/searchtotalpayments",
	      method : "POST",
	      dataType : "json",
	      data : {
	         "nxtQyKey" : nxtQyKey
	      },
	      success : function(data) {
	         if (data.status == "success") {
	        	 var a = 0
	        	 a = data.result.indexOf("billAmt")+11;
	        	 var value = ""
	        	 value = data.result.substr(a,15);
	        	 var test = 0
	        	 test = parseInt(value);
	        	 amt += test;
	        	 $("#overdueAmt").html("총 " + comma(amt) + "원");
	        	 //amt += test;
	        	 var tag = '';
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+7+');" id="foreignSelect'+7+'" checked="checked" disabled="disabled"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>이달의  카드값: '+ comma(test) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+7 +'" value="'+parseInt(test)+'"/>'	
					tag += '</li>'
					$("#overdueDetail").append(tag);
	         } else {
	            alter("정보를 가져오는데 실패했습니다.")
	         }
	         //amt = parseInt(amt);
	         //$("#exchangeAmt").html(comma(amt) + "원");
	         //$("#overdueAmt").html(comma(amt));
	      }
	   })
}
function getFstock(acct_no, acct_gds_code, acct_pwd, fx_clas_code, natn_tp_code, for_mrkt_tp_code, qry_tp_code){
	$.ajax({
		url : "/fstock/remq",
		method : "POST",
		dataType : "json",
		data : {
			"acct_no" : acct_no,
			"acct_gds_code" : acct_gds_code,
			"acct_pwd" : acct_pwd,
			"fx_clas_code" : fx_clas_code,
			"natn_tp_code" : natn_tp_code,
			"for_mrkt_tp_code" : for_mrkt_tp_code,
			"qry_tp_code" : qry_tp_code
		},
		success : function(data) {
			if (data.status == "success") {
				//amt += parseInt(data.result[0].gas_bill);
			} 
			else {
				alter("정보를 가져오는데 실패했습니다.")
			}
			//amt = parseInt(amt);
			//$("#exchangeAmt").html(comma(amt) + "원");
			//$("#overdueAmt").html("총 " + comma(amt) + "원");
		}
	})
}

function getAsset(cust_id) {
	$.ajax({
		url : "/asst/status",
		method : "POST",
		dataType : "json",
		data : {
			"cust_id" : cust_id
		},
		success : function(data) {
			if (data.status == "success") {
			} 
			else {
				alter("정보를 가져오는데 실패했습니다.")
			}
			//amt = parseInt(amt);
			//$("#exchangeAmt").html(comma(amt) + "원");
			//$("#overdueAmt").html("총 " + comma(amt) + "원");
		}
	})
}
function getAccount(serviceCode, business_code, heck_conceal_account, check_security_account, rr_number){
	$.ajax({
		url : "/account/list",
		method : "POST",
		dataType : "json",
		data : {
			"serviceCode" : serviceCode,
			"business_code" : business_code,
			"heck_conceal_account" : heck_conceal_account,
			"check_security_account" : check_security_account,
			"rr_number" : rr_number
		},
		success : function(data) {
	         if (data.status == "success") {
	        	 var list = data.result.split(',');
	        	 var a = ""; 
	        	 a = list[22].substring(59);
	        	 a = a.substring(1,a.length-1);
	        	 var test = 0;
	        	 if (a==1){
	        		 test = parseInt(list[32].substring(18));
	        	 }
	        	 amt -= test;
	        	 
	        	 var tag = '';
					tag += '<div class ="name">'
					tag += '<strong>통잔잔고: '+ comma(test) + '</strong>'
					tag += '</div>'
					$("#expect").append(tag);
	         } else {
	            alter("정보를 가져오는데 실패했습니다.")
	         }
	         //amt = parseInt(amt);
	         //$("#exchangeAmt").html(comma(amt) + "원");
	         //$("#overdueAmt").html(comma(amt));
	      }
	   })
}

function getAvgCharge(username) {
	$.ajax({
		url : "/get_avg_charge",
		method : "POST",
		dataType : "json",
		data : {
			"username" : username
		},
		success : function(data) {
			if (data.status == "success") {
				amt += parseInt(data.result[0].gas_bill);
				amt += parseInt(data.result[0].electric_charges);
				amt += parseInt(data.result[0].monthly_rent);
				amt += parseInt(data.result[0].car_tax);
				amt += parseInt(data.result[0].insurance_fee);
				amt += parseInt(data.result[0].automatic_withdrawal);
			} else {
				alter("정보를 가져오는데 실패했습니다.")
			}
			//amt = parseInt(amt);
			//$("#exchangeAmt").html(comma(amt) + "원");
			$("#overdueAmt").html("총 " + comma(amt) + "원");
		}
	})
}

function comma(num){
    var len, point, str; 
       
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
     
    return str;
 
}

function getOverdueDetail(username) {
	$.ajax({
		url : "/get_avg_charge",
		method : "POST",
		dataType : "json",
		data : {
			"username" : username
		},
		success : function(data) {
			if (data.status == "success") {
				var tag = '';
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+1+');" id="foreignSelect'+1+'" checked="checked"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>주유비 : '+ comma(parseInt(data.result[0].gas_bill)) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+1 +'" value="'+parseInt(data.result[0].gas_bill)+'"/>'	
					tag += '</li>'
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+2+');" id="foreignSelect'+2+'" checked="checked"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>공과금 : '+ comma(parseInt(data.result[0].electric_charges)) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+2 +'" value="'+parseInt(data.result[0].electric_charges)+'"/>'
					tag += '</li>'
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+3+');" id="foreignSelect'+3+'" checked="checked"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>월세 : '+ comma(parseInt(data.result[0].monthly_rent)) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+3 +'" value="'+parseInt(data.result[0].monthly_rent)+'"/>'
					tag += '</li>'
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+4+');" id="foreignSelect'+4+'" checked="checked"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>자동이체 : '+ comma(parseInt(data.result[0].automatic_withdrawal)) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+4 +'" value="'+parseInt(data.result[0].automatic_withdrawal)+'"/>'
					tag += '</li>'
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+5+');" id="foreignSelect'+5+'" checked="checked"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>보험료 : '+ comma(parseInt(data.result[0].insurance_fee)) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+5 +'" value="'+parseInt(data.result[0].insurance_fee)+'"/>'
					tag += '</li>'
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+6+');" id="foreignSelect'+6+'" checked="checked"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>세금 : '+ comma(parseInt(data.result[0].car_tax)) + '</strong>'
					tag += '</div>'
					tag += '<input type="hidden" id="foreign'+6 +'" value="'+parseInt(data.result[0].car_tax)+'"/>'
					tag += '</li>'
				$("#overdueDetail").append(tag);
			} else {
				alter("정보를 가져오는데 실패했습니다.")
			}
		}
	})
}

$(function(){
	$("#detail").hide();

	$("#view_detail").click(function(){
		$("#detail").toggle();
	})
	getAvgCharge("장지용");
	getCardfee("nxtQyKey");
	getAccount("");
	getFstock("", "", "", "", "", "", "");
	getAsset("");
	getOverdueDetail("장지용");
	$("#go_to_options_btn").click(function(){
		$("#options_param").val(amt);
		$("#go_to_options_form").submit();
	})	
})
