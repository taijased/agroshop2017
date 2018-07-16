<?
	include('c2db.php');
	$ans1 = array();
	if($res = $god->query("SELECT * FROM `booked`")){
		while($row = $res->fetch_assoc())$ans1[] = $row;
	}
	$ans3 = array();
	for($i = 0;$i<count($ans1);$i++){
		if($res = $god->query("SELECT * FROM `product` WHERE `Код` = '".$ans1[$i]['Код']."'")){
			while($row = $res->fetch_assoc()){
				if($row["Наличие"] > 0){
					if(count($ans3) == 0)$ans3[] = array('number' => $ans1[$i]["number"]);
					for($j = 0;$j<count($ans3);$j++){
						if($ans3[$j]['number'] == $ans1[$i]['number'])break;
						else if($j+1 == count($ans3)){
							$ans3[] = array('number' => $ans1[$i]["number"]);
							break;
						}
					}
				}
			}
		}else{
			echo json_encode("S");
			exit;
		}
	}

	echo json_encode($ans3);

?>