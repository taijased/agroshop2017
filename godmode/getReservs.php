<?
	include('c2db.php');
	if(!isset($_POST['num'])){
		echo json_encode("ERROR_QUERY");
		exit;
	}
	if($res = $god->query("SELECT * FROM `booked` WHERE `number` = '".$_POST['num']."'")){
		$ans = array();
		while($row = $res->fetch_assoc())$ans[] = $row;
		echo json_encode($ans);
	}

?>