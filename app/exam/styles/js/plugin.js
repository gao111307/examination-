var storage = window.localStorage;
var initData = {};
var formData = {};

function set(k,v,t){
	var _this = this;
	if(typeof(_this) == "object"&& Object.prototype.toString.call(_this).toLowerCase() == "[object object]" && !_this.length)
	{
		_this[k] = {'value':v,'time':t};
		storage.setItem('questions',$.toJSON(formData));
	}
}

function clearStorage()
{
	storage.removeItem('questions');
}

function submitPaper()
{
	//clearStorage();
	$('#submodal').modal('hide');
	$('#form1').submit();
}

function refreshRecord(){
	$('#form1 :input[type=text]').each(function(){
		var _= this;
		var _this=$(this);
		var p=[];
		p.push(_.name);
		p.push(_.value);
		set.apply(formData,p);
		markQuestion(_this.attr('rel'),true);
	});
	$('#form1 textarea').each(function(){
		var _= this;
		var _this=$(this);
		var p=[];
		for ( instance in CKEDITOR.instances )
		CKEDITOR.instances[instance].updateElement();
		p.push(_.name);
		p.push(_.value);
		set.apply(formData,p);
		markQuestion(_this.attr('rel'),true);
	});
}

function saveanswer(){
	var params = $(':input').serialize();
	$.ajax({
	   url:'index.php?exam-app-exam-ajax-saveUserAnswer',
	   async:false,
	   type:'post',
	   dataType:'json',
	   data:params
	});
}

function markQuestion(rel,isTextArea)
{
	var t = 0;
	var f = false;
	try
	{
		f = $('#form1 :input[rel='+rel+']');
	}catch(e)
	{
		f = false;
	}
	if(!f)return false;
	if(isTextArea)
	{
		if($('#form1 :input[rel='+rel+']').val() && $('#form1 :input[rel='+rel+']').val() != '' && $('#form1 :input[rel='+rel+']').val() != '<p></p>')t++;
	}
	else
	$('#form1 :input[rel='+rel+']').each(function(){if($(this).is(':checked') && $(this).val() && $(this).val() != '' && $(this).val() != '<p></p>')t++;});
	if(t > 0)
	{
		if(!$('#sign_'+rel).hasClass("badge-info"))$('#sign_'+rel).addClass("badge-info");
	}
	else
	{
		$('#sign_'+rel).removeClass("badge-info");
	}
	$('.yesdonumber').html($('#modal-body .badge-info').length);
}

function batmark(rel,value)
{
	if(value && value != '')
	{
		if(!$('#sign_'+rel).hasClass("badge-info"))$('#sign_'+rel).addClass("badge-info");
	}
	else
	$('#sign_'+rel).removeClass("badge-info");
	$('.yesdonumber').html($('#modal-body .badge-info').length);
}

function _markQuestion(rel)
{
	if(!$('#sign_'+rel).hasClass("badge-info"))$('#sign_'+rel).addClass("badge-info");
	$('.yesdonumber').html($('#modal-body .badge-info').length);
}

function signQuestion(id,obj)
{
	$.get("index.php?exam-app-index-ajax-sign&questionid="+id+'&'+Math.random(),function(data){if(parseInt(data) != 1){$('#sign_'+id).removeClass('signBorder');$(obj).children("em").attr("class","icon-star-empty");}else{$('#sign_'+id).addClass('signBorder');$(obj).children("em").attr("class","icon-star");}});
}

function favorquestion(questionid){
	$.get("index.php?exam-app-favor-ajax-addfavor&questionid="+questionid+'&'+Math.random(),function(data){if(data != 2)alert('收藏成功'); else alert('不能添加即时组卷试题');});
}

function delfavorquestion(questionid){
	$.get("index.php?exam-app-favor-ajax-delfavor&questionid="+questionid+'&'+Math.random(),function(){alert('删除成功');window.location.reload();});
}

function question_error(questionid) {
	var dialog = art.dialog({
		id: 'error',
		fixed: true,
		title: '该题有错？请详细填写以下内容：',
		okVal: '提交问题',
		ok: function() {
			$.post("?exam-app-submitError", {
				'id': questionid /*,'type':type,'info':info*/
			}, function(result) {
				var msg;
				if (result == 0) {
					msg = '已提交成功，我们会尽快处理，谢谢！';
				} else if (result == 1) {
					msg = '该题目已经提交过，请耐心等待！';
				} else if (result == 3) {
					msg = '非法ID，试题已过期或不存在此试题！';
				} else {
					//msg = '提交失败！';
					msg = result;
				}
				alert(msg);
			});
			return true;
		},
		cancel: true,
		cancelval: '取消',
		content: '您确定要举报这个问题吗？'
	});
}