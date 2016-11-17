<?php

class errorquestion_exam
{
	public $G;
	
	public function __construct(&$G)
	{
		$this->G = $G;
		$this->sql = $this->G->make('sql');
		$this->db = $this->G->make('db');
		$this->pg = $this->G->make('pg');
		$this->ev = $this->G->make('ev');
	}
	
	//提交错题
	//参数：试题ID，用户ID
	//返回值：试题提交后的ID
	public function errorQuestion($questionid,$userid)
	{
		$args = array("errorquestionid" => $questionid,"erroruserid" => $userid);
		$data = array("errorquestion",$args);
		$sql = $this->sql->makeInsert($data);
		$this->db->exec($sql);
		return $this->db->lastInsertId();
	}
	
	//根据用户ID和试题ID获取试题是否被提交过
	//参数：试题ID，用户ID
	//返回值：试题信息数组（无则为FALSE）
	public function getErrorByQuestionAndUserId($id,$userid)
	{
		$data = array(false,'errorquestion',array("errorquestionid = '{$id}'","erroruserid = '{$userid}'"));
		$sql = $this->sql->makeSelect($data);
		return $this->db->fetch($sql,'errorquestion');
	}
	
	//获取错题列表
	//参数：当前页码，每页显示数量，参数（数组或者字符串）
	//返回值：试题列表数组
	public function getErrorQuestionList($page,$number = 20,$args = 1)
	{
		$page = $page > 0?$page:1;
		$r = array();
		$data = array(false,'errorquestion',$args,false,'errorquestionid ASC',array(intval($page-1)*$number,$number));
		$sql = $this->sql->makeSelect($data);
		$r['data'] = $this->db->fetchAll($sql,false);
		$data = array('count(DISTINCT errorid) AS number','errorquestion',$args);
		$sql = $this->sql->makeSelect($data);
		$t = $this->db->fetch($sql);
		$pages = $this->pg->outPage($this->pg->getPagesNumber($t['number'],$number),$page);
		$r['pages'] = $pages;
		$r['number'] = $t['number'];
		return $r;
	}
	
	//按照ID删除提交的错误试题
	//参数：试题ID
	//返回值：受影响记录数
	public function delErrorQuestions($id)
	{
		$data = array('errorquestion',"errorquestionid = '{$id}'");
		$sql = $this->sql->makeDelete($data);
		$this->db->exec($sql);
		return $this->db->affectedRows();
	}
}
?>