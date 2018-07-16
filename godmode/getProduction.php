<?
	include('c2db.php');
	if($res = $god->query("SELECT * FROM `production`")){
		$ans = array();
		while($row = $res->fetch_assoc())$ans[] = $row;
		echo json_encode($ans);
	}
?>