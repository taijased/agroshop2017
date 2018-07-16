<?
	include('cdb.php');
	if(!isset($_POST['fio'], $_POST['phone'], $_POST['email'], $_POST['Код'], $_POST['count'])){
		echo json_encode("ERROR_QUERY");
		exit;
	}
	$fio = $_POST['fio'];
	$ph = $_POST['phone'];
	$ml = $_POST['email'];
	$cd = explode(";", $_POST['Код']);
	$cnt = explode(";", $_POST['count']);
	$token = get_token();
	for($i = 0;$i<count($cd);$i++){
		if($link->query("INSERT INTO `booked` (`number`, `Код`, `count`) VALUES('".$token."','".$cd[$i]."','".$cnt[$i]."')")){
			echo json_encode("SUCCESSFUL");
		}
		else{
			echo json_encode("UNSUCCESSFUL");
			exit;
		}
	}
	if($link->query("INSERT INTO `reservation` (`fio`,`phone`,`email`,`number`,) VALUES('".$fio."','".$ph."','".$ml."','".$token."')"))
?>
<?
function get_token(){
	$res = "";
	for($i=0;$i<35;$i++)$res .= get_bukvu(rand(1, 62));
	return $res.time();
}
function get_bukvu($num){
	$f = [ 1 => "a",
		   2 => "H",
			3=> "F",
			4=> "B",
			5=> "R",
			6=> "v",
			7=> "D",
			8=> "U",
			9=> "x",
			10=> "3",
			11=> "N",
			12=> "q",
			13=> "Q",
			14=> "h",
			15=> "2",
			17=> "F",
			18=> "i",
			19=> "S",
			20=> "c",
			21=> "E",
			22=> "b",
			23=> "g",
			24=> "X",
			25=> "O",
			26=> "t",
			27=> "P",
			28=> "y",
			29=> "n",
			30=> "r",
			31=> "A",
			32=> "d",
			33=> "4",
			34=> "K",
			35=> "f",
			36=> "Y",
			37=> "e",
			38=> "9",
			39=> "V",
			40=> "o",
			41=> "J",
			42=> "7",
			43=> "w",
			44=> "I",
			45=> "6",
			46=> "m",
			47=> "W",
			48=> "z",
			49=> "s",
			50=> "8",
			51=> "0",
			52=> "u",
			53=> "5",
			54=> "M",
			55=> "k",
			56=> "j",
			57=> "1",
			58=> "Z",
			59=> "p",
			60=> "T",
			61=> "C",
			62=> "l"
	];
	return $f[$num];
}
?>