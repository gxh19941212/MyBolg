$(function(){//#modal-cont
	$(".modal-body form").submit(function(){
		if($("#username").val()==''){
			$("#username").attr("placeholder",'账号不能为空')
			return false;
		}
		if($("#password").val()==''){
			$("#password").attr("placeholder",'密码不能为空')
			return false;
		}
	})
})
function logreg(type,id,tit){
	$("#"+id).find(".modal-title").html(tit);
	$("#"+id).find("button[type=submit]").html(tit);
	$("#"+id).find('form').attr("action",type);
	$("#"+id).find("#username").val('');
	$("#"+id).find("#password").val('');
}