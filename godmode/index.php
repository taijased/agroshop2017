<?
if(!isset($_POST['clean'])){
	session_start(); 
}else{
	session_start(); 
	unset($_SESSION['token']);
	unset($_SESSION['user']);
	session_destroy();
}
$form_login = '<form method="POST" class="loginForm" action="index.php">
			<label><input type="text" name="username" placeholder="Логин"></label><br />
			<label><input type="password" name="password" placeholder="Пароль"></label><br />
			<label><input type="submit" name="submitButton" value="Войти"></label><br />
			</form>';

	$uncorrect_data = "<div class='uncorrect'>
					      <h2>Неверные данные, нахал!</h2>
	</div>";
	$form_logout = '<form method="POST" class="logoutForm" action="index.php">
			<input type="submit" name="exit" value="Выход">
			<input type="hidden" name="clean" value="OK">
		   </form>';
	
?>
<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/godstyle.css">
		<script src="https://code.jquery.com/jquery-2.2.0.min.js" type="text/javascript"></script>
		<script type="text/javascript" src="js/godscript.js"></script>
	</head>
	<body>
	<?
		if(!isset($_SESSION['token'])){
			if(!isset($_POST['username'], $_POST['password'])){
				echo $form_login;
			}else{
				include('c2db.php');
				$log = $_POST['username'];
				$pass = $_POST['password'];
				if($res = $god->query("SELECT `token` FROM `users` WHERE `acc` = '".$log."' AND `pass` = '".$pass."'")){
					$ans = array();
					while($row = $res->fetch_assoc())$ans[] = $row;
					if(count($ans) != 0){
						$_SESSION['token'] = $ans[0]['token'];
						$_SESSION['user'] = $log;
						echo wrapper($_SESSION['user']);

					}else{
						echo $uncorrect_data."<br />".$form_login;
					}
				}
			}
		}else{
			echo wrapper($_SESSION['user']);
		}
	?>
	<!--<form method="POST" action="http://backdoor.890m.com/cms/addOrder.php">
		ФИО<input type="text" name="fio" class="fio"><br/>
		Телефон<input type="text" name="phone" class="phone"><br/>
		Мыло<input type="text" name="email" class = "email"><br/>
		Тип доставки<input type="text" name="type" class="type"><br/>
		Время<input type="text" name="time" class="time"><br/>
		Артикулы<input type="text" name="Код" class="Код"><br/>
		Количество<input type="text" name="count" class="count"><br/>
		<input type="button" name="asdasd" class="btn" value="send">
	</form>-->
	</body>
</html>
<?
function qurva($var){
	return mysql_real_escape_string($var);
}function wrapper($user){$str = '
	<div class="wrapper">
	<div class="info">Добро пожаловать в личный кабинет,'.$user.'!</div>
			<div class="data">
				<div class="data_type">
				<div class="callored">Заказы</div>
					<div class="orders">

					</div>
				<div class="callres">Бронь</div>
					<div class="reservations">
					</div>
				</div>
				<div class="more_info">
				</div>
			</div></div>';
			return $str;
		}
?>