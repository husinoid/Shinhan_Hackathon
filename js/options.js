var total = 0;

function totalSum(id, num) {
	console.log(id);
	console.log(num);
	if (id == "foreign") {
		if($("#foreignSelect" + num).is(":checked")) {
			total += parseInt($("#foreign"+num).val());
		} else {
			total -= parseInt($("#foreign"+num).val());
		}
	} else if (id == "loan") {
		if($("#loanSelect" + num).is(":checked")) {
			total += parseInt($("#loan"+num).val());
		} else {
			total -= parseInt($("#loan"+num).val());
		}
	} else {
		if($("#cashSelect" + num).is(":checked")) {
			total += parseInt($("#cash"+num).val());
		} else {
			total -= parseInt($("#cash"+num).val());
		}
	}
	if(total > $("#overdue_amt").val())
		$("#result").html("총 " + comma($("#overdue_amt").val()) + "원")
	else
		$("#result").html("총 " + comma(total) + "원")
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

function getForeignAccount(username) {
	$.ajax({
		url : "/get_foreign_acount",
		method : "POST",
		dataType : "json",
		data : {
			"username" : username
		},
		success : function(data) {
			if (data.status == "success") {
				var tag = '';
				var krw_sum = 0;
				var foreign_sum = 0;
				for (var i = 0; i < data.result.length; i++) {
					foreign_sum = foreign_sum + parseInt(data.result[i].foreign_amt);
					krw = parseInt(data.result[i].foreign_amt) * parseFloat(data.exchange_rate);
					krw_sum = krw_sum + krw;
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'foreign\', '+(i+1)+');" id="foreignSelect'+(i+1)+'"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>외화 계좌번호 : '
							+ data.result[i].account_num + '</strong>'
					tag += '<span class="time small">현재 잔액 : $'
							+ comma(parseInt(data.result[i].foreign_amt)) + ' / ' + comma(krw) + '원</span>'
					tag += '</span>'
					tag += '<input type="hidden" id="foreign'+ (i+1) +'" value="'+krw+'"/>'	
					tag += '</div>'
					tag += '</li>'
				}
				$("#foreignList").append(tag);
				$("#exchangeAmt").html(comma(krw_sum) + "원");
				$("#dollar").html("$" + comma(foreign_sum));
				$("#exchangeRate").html(data.exchange_rate);
			} else {
				alert("정보를 가져오는데 실패했습니다.")
			}
		}
	})
}

function getLoan(username) {
	$.ajax({
		url : "/get_loan",
		method : "POST",
		dataType : "json",
		data : {
			"username" : username
		},
		success : function(data) {
			if (data.status == "success") {
				var tag = '';
				var krw_sum = 0;
				for (var i = 0; i < data.result.length; i++) {
					krw_sum = krw_sum + parseInt(data.result[i].amt);
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'loan\', '+(i+1)+');" id="loanSelect'+(i+1)+'"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>' + data.result[i].type + ' '
							+ data.result[i].name + '</strong>'
					tag += '<span class="time small">이율 : '
							+ data.result[i].rate + ' / 금액 : '
							+ comma(parseInt(data.result[i].amt))+ '원</span>'
					tag += '</span>'
					tag += '<input type="hidden" id="loan'+ (i+1) +'" value="'+data.result[i].amt+'"/>'
					tag += '</div>'
					tag += '</li>'
				}
				$("#loan_list").append(tag);
				$("#loanAmt").html(comma(krw_sum) + "원");
			} else {
				alert("정보를 가져오는데 실패했습니다.")
			}
		}
	})
}

function getCash(username) {
	$.ajax({
		url : "/get_cash",
		method : "POST",
		dataType : "json",
		data : {
			"username" : username
		},
		success : function(data) {
			if (data.status == "success") {
				var tag = '';
				var krw_sum = 0;
				for (var i = 0; i < data.result.length; i++) {
					krw_sum = krw_sum + parseInt(data.result[i].amt);
					tag += '<li>'
					tag += '<div class="notice-icon">'
					tag += '<i class="fa"><input type="checkbox" onclick="totalSum(\'cash\', '+(i+1)+');" id="cashSelect'+(i+1)+'"></i>'
					tag += '</div>'
					tag += '<div>'
					tag += '<span class="name">'
					tag += '<strong>' + data.result[i].type
							+ '</strong>'
					tag += '<span class="time small">이율 : '
							+ data.result[i].rate + ' / 금액 : '
							+ comma(parseInt(data.result[i].amt)) + '원</span>'
					tag += '</span>'
					tag += '<input type="hidden" id="cash'+ (i+1) +'" value="'+data.result[i].amt+'"/>'
					tag += '</div>'
					tag += '</li>'
				}
				$("#cash_list").append(tag);
				$("#cashAmt").html(comma(krw_sum) + "원");
			} else {
				alert("정보를 가져오는데 실패했습니다.")
			}
		}
	})
}

$(function() {
	$("#detail1").hide();
	$("#detail2").hide();
	$("#detail3").hide();
	$("#for_detail").click(function() {
		$("#detail1").toggle();
	})
	$("#loan_detail").click(function() {
		$("#detail2").toggle();
	})
	$("#cardService_detail").click(function() {
		$("#detail3").toggle();
	})

	getForeignAccount("장지용");
	getLoan("장지용");
	getCash("장지용");
	
	$("#apply").click(function(){
		$.ajax({
			url : "/apply_loan",
			method : "POST",
			dataType : "json",
			data : {
				"username" : "장지용"
			},
			success : function(data) {
				if (data.status == "success") {
					location.href="/end";
				} else {
					alert("연대 서비스 연동에 실패했습니다.")
				}
			}
		})
	});
})