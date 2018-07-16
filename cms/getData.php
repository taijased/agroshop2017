<?
	include('cdb.php');
	if($_POST['table']){
		if($res = $link->query("SELECT * FROM `product` WHERE `Категория` = '".$_POST['table']."'")){
			$jar = array();
			while($row = $res->fetch_assoc()){
				$jar[] = $row;
			}
			echo json_encode($jar);
		}else{
			echo "EQUERY"; 
		}
	}else{
		echo "QEMPTY";
	}

?>