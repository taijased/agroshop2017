<?
	include('c2db.php');
	$articules = explode(';',$_POST['articules']);
	$jar = array();
	$qry_where = "`Код`=\"".$articules[0]."\"";
	$count_art = count($articules);
	for($i = 1;$i<$count_art;$i++)$qry_where .= " OR `Код`=\"".$articules[$i]."\"";
	$qry = "SELECT * FROM `product` WHERE ".$qry_where;//`Код`=\"".$articules[$j]."\"";
	if($res = $god->query($qry)){
		while($row = $res->fetch_assoc()){
			$jar[] = $row;
		}
	}else{
		echo json_encode("EQUERY"); 
		exit;
	}
	echo json_encode($jar);

?>