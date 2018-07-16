<?

	include('cdb.php');//подключаемся к БД
	if(!isset($_POST['data'])){
		echo json_encode("EMPTY_STRING");
		exit;
	} 
	$words = clean_array_to_search(explode(" ", clean_post_data($_POST['data'])), 10, 3);//чистим от говна(теги и вся хуйня), делим на слова и готовим слова к поиску
	$jar = array();//массив  с таблицами БД
	if($res = $link->query("SHOW TABLES FROM u111116986_trk")){
		while($row = $res->fetch_assoc()){
			$jar[] = $row;
		}
	}else{
		echo json_encode("DBEMPTY");
		exit;
	}
	$result = array();//результат поиска по всей БД
	$sql = "SELECT * FROM `product` WHERE ";
	$i = 0;
	foreach($words as $key => $value){
		$i++;
		$sql = $sql." `Наименование` LIKE \"%".$value."%\"".($i==count($words)?"":" OR");
	}
	if($res = $link->query($sql)){
		while($row = $res->fetch_assoc()){
			$result[] = $row;
		}
	}
	echo json_encode($result);
	exit;
?>
<?
function clean_post_data($data){
	$data = strip_tags($data);
	$data = strtolower($data);
	$data = preg_replace('~[^a-z0-9 \x80-\xFF]~i', "",$data); 
	return $data;
}
function clean_array_to_search($words = array(), $max = 0, $min_length){
	$result = array();
	$i = 0;
	foreach($words as $key => $value){
		if(strlen(trim($value)) >= $min_length){
			$i++;
			if($i <= $max){
				$result[] = trim($value);
			}
		}
	}
	return $result;
}
function get_matches($content, $word = array()){
	$matches = array();
	foreach($content as $p){
		$res[$p->page_id] = $p;
		foreach($word as $w){
			if(trim($w) != ""){
				$w = trim($w);
				$matches[$p->page_id] = $matches[$p->page_id] + count(explode($w, $p->page_name));
				$matches[$p->page_id] = $matches[$p->page_id] + count(explode($w, $p->page_text));
			}
		}
	}
	arsort($matches);
	$i = 0;
	foreach($matches as $k => $v){
		$result[$i] = $res[$k];
		$result[$i]->matches = $v;
		$i++;
	}
	return $result;
}
?>