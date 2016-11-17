{x2;if:!$userhash}
{x2;include:header}
<body>
{x2;include:nav}
<div class="container-fluid">
	<div class="row-fluid">
		<div class="span2">
			{x2;include:menu}
		</div>
		<div class="span10" id="datacontent">
{x2;endif}
			<ul class="breadcrumb">
				<li><a href="index.php?{x2;$_app}-master">{x2;$apps[$_app]['appname']}</a> <span class="divider">/</span></li>
				<li class="active">错题提交</li>
			</ul>
			<ul class="nav nav-tabs">
				<li class="active">
					<a href="#">错题列表</a>
				</li>
			</ul>
	        <table class="table table-hover">
	            <thead>
	                <tr>
	                    <th>题目ID</th>
				        <th>提交人员ID</th>
				        <th>操作</th>
	                </tr>
	            </thead>
	            <tbody>
                    {x2;tree:$errorquestion['data'],question,qid}
			        <tr>
						<td>
							{x2;v:question['errorquestionid']}
						</td>
						<td>
							{x2;v:question['erroruserid']}
						</td>
						<td>
							<div class="btn-group">
	                    		<a class="btn ajax" href="index.php?exam-master-errorquestionlist&page={x2;$page}&questionid={x2;v:question['errorquestionid']}{x2;$u}" title="转到题目（不可用）"><em class="icon-edit"></em></a>
								<a class="btn ajax" href="index.php?exam-master-errorquestionlist-delerrorquestion&questionparent=0&page={x2;$page}&errorquestionid={x2;v:question['errorquestionid']}{x2;$u}" title="问题已审查，删除该提交"><em class="icon-remove"></em></a>
	                    	</div>
						</td>
			        </tr>
			        {x2;endtree}
	        	</tbody>
	        </table>
			<div class="pagination pagination-right">
				<ul>{x2;$errorquestion['pages']}</ul>
			</div>
			<div aria-hidden="true" id="modal" class="modal hide fade" role="dialog" aria-labelledby="#myModalLabel">
				<div class="modal-header">
					<button aria-hidden="true" class="close" type="button" data-dismiss="modal">×</button>
					<h3 id="myModalLabel">
						试题详情
					</h3>
				</div>
				<div class="modal-body"></div>
				<div class="modal-footer">
					 <button aria-hidden="true" class="btn" data-dismiss="modal">关闭</button>
				</div>
			</div>
{x2;if:!$userhash}
		</div>
	</div>
</div>
</body>
</html>
{x2;endif}