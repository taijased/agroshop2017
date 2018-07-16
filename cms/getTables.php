<?
	include('cdb.php');
	$jar = array();
	if($res = $link->query("SELECT *  FROM `category`")){
		while($row = $res->fetch_assoc()){
			$jar[] = $row;
		}
		echo json_encode($jar);
	}else{
		echo json_encode("DBEMPTY");
	}


?>