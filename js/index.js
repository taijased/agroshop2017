$(window).load(function() {
  $('#before-load').find('i').fadeOut().end().delay(10).fadeOut('slow');
});
function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}



$(document).ready(function(){

	var mydata = decodeURIComponent($_GET("articule"));
	if(mydata){
		$.ajax({
			url:"cms/getFA.php",
			type:"POST",
			data:{articules: mydata},
			success:function(json){
				var data = JSON.parse(json);
								
				//var map_chapter = "&raquo;<a id=\"a_category\">" + data[0]['category'] + "</a>";
				$('#content-page').html(getHTMLProduct(data[0]['img'], data[0]['Код'], data[0]['Цена'],data[0]['Наличие']));
				//$('#map_page').append(map_chapter);
				$('#name-chapter').html(data[0]['Наименование']);
			}
		});
	}
	
});
/*$(document).ready(function(){

	var mydata = decodeURIComponent($_GET("search"));
	if(mydata){
		searchRequest(mydata);
	}
	
});*/
$(document).ready(function(){

	var mydata = decodeURIComponent($_GET("catalog"));
		
});

$(document).ready(function(){
		$.ajax({
		url:"cms/getTables.php",
		success:function(json){
			var data = JSON.parse(json); 
			var str = "";
			for(var i = 0;i<data.length;i++){
				str += "<div class='catalog' id='" + data[i]["name"] + "'>" + data[i]["name"] + "</div>";			
			}
			$('#left_bar').append(str);
		}		
	});
});



$(document).ready(function(){
	var str = "";
	var total_price = 0;
	var total_product = 0;
	if(localStorage.length == 0){
		$('#totalBasket').html(getHTMLBasketDefault());
	}else{
		var request = "";
		for(var i = 0; i < localStorage.length;i++){

			request +=(i < localStorage.length - 1)? localStorage.key(i) +";" : localStorage.key(i);

		}
		//console.log(request);

		$.ajax({
			type:"POST",
			url:"cms/getFA.php",
			data:{'articules' : request },
			success:function(json){
				
				var data = JSON.parse(json);
				
				for(var i = 0; i < data.length;i++){

					var temp =  Number(localStorage.getItem(data[i]["Код"]));
					str += getHTMLBasketProduct(data[i]['Наименование'], data[i]["Цена"],data[i]["Код"],data[i]["img"], temp);
					total_price += Number(data[i]["Цена"]) * temp;
					total_product +=temp;
				}
				str +="<div id=\"price_black_line\"></div>\
						<div id=\"b_total_price\">\
						</div>";
				$('#totalBasket').append(str);
				$('#b_total_price').append(getHTMLTotalPrice(total_product,total_price));
			}

		});
	}
});
function getHTMLBasketProduct(name,price,articul,img, total){
	var str = "<div class='b_product' id='" + articul + "'>\
							<div id=\"b_close\"></div>\
							<div class=\"b_info_prod\">\
								<div id=\"b_photo_prod\" style=\"background-image:url('" + img + "');\"></div>\
								<div class=\"b_more_info\">\
									<div id=\"b_name_prod\">" + name + "</div>\
									<div id=\"b_articul_prod\">Артикул: <span>"+ articul+"</span></div>\
									<div id=\"b_price_prod\"><p>" + price + " руб.</p></div>\
								    <div id=\"b_umnog\">x<span>" + total + "</span></div>\
									<div id=\"clear\"></div>\
									<div id=\"clear\"></div>\
								</div>\
							</div>\
							\
							<div class=\"b_total_prod\">\
								"/*<form>\
									<fieldset>\
										<div><label>Кол-во: </label></div>\
										<div><input type=\"number\" min=\"1\" max=\"100\" step=\"1\" value=\"1\"/></div>\
									</fieldset>\
								</form>\*/
								+ "\
								<p>Количество: </p>\
								<div id=\"total_number_input\">\
									<div id=\"b_minus\"></div>\
									<input id=\"b_meter\" type=\"text\" value=\"" + total +"\" disabled/>\
									<div id=\"b_plus\"></div>\
								</div>\
							</div>	\
						</div>";
	return str;
}
/*function updateBasketProduct(){
	var str = "";
	var total_price = 0;
	var total_product = 0;
	if(localStorage.length == 0){
		str +=getHTMLBasketDefault();
		$('#totalBasket').html(str);
	}else{
		var request = "";
		for(var i = 0; i < localStorage.length;i++){

			request +=(i < localStorage.length - 1)? localStorage.key(i) +";" : localStorage.key(i);

		}
		//console.log(request);

		$.ajax({
			type:"POST",
			url:"cms/getFA.php",
			data:{'articules' : request },
			success:function(json){
				
				var data = JSON.parse(json);
				
				for(var i = 0; i < data.length;i++){

					var temp =  Number(localStorage.getItem(data[i]["Код"]));
					str += getHTMLBasketProduct(data[i]['Наименование'], data[i]["Цена"],data[i]["Код"],data[i]["img"], temp);
					total_price += Number(data[i]["Цена"]) * temp;
				}
				str +="<div id=\"price_black_line\"></div>\
						<div id=\"b_total_price\">\
						</div>";
				$('#totalBasket').html(str);
				$('#b_total_price').append(getHTMLTotalPrice(total_product,total_price));
			}

		});
	}

};*/

$(document).on('click','#b_close',function(){
	var articules = $(this).parent().attr('id');
	localStorage.removeItem(articules);
	$(this).parent().remove();
	$("#total_tovar").html(localStorage.length);
	if(localStorage.length != 0){
		updatePrice();
	}else{

		$('#totalBasket').html(getHTMLBasketDefault());
	}
	
	
});
$(document).on('click','#clear_basket', function(){
	localStorage.clear();
	$("#total_tovar").html(localStorage.length);
	$('#totalBasket').html(getHTMLBasketDefault());
});
/*$(document).on('click',"#update_total_price", function(){
		updateBasketProduct();
})
*/
$(document).on('click','#a_category', function(){

	var href = $('#a_category').html();
	console.log(href);
	var map_chapter = "<a href=\"index.html\">Главная</a>";
	sessionStorage.setItem("catalog", href);
	$.ajax({
		type:"POST",
		url:"cms/getData.php",
		data:{table : href},
		success: function(json){

			var data = JSON.parse(json);
			var str = "";
			for(var i = 0;i<data.length;i++){

				str +=getHTMLCategory(data[i]['Код'],data[i]['img'],data[i]['Наименование'],data[i]["Цена"]);
			}
			$('#content-page').html(str);
		}
	})

	$('#map_page').html(map_chapter);
	$('#name-chapter').html(href);
});


$(document).on('click', '.catalog', function(){

	var href = $(this).html();
	var chapter = $(this).attr('id');
	history.pushState(null, null, "?catalog=" + chapter);

	var map_chapter = "<a href=\"index.html\">Главная</a>";
	sessionStorage.setItem("catalog", href);
	$.ajax({
		type:"POST",
		url:"cms/getData.php",
		data:{table : href},
		success: function(json){
			console.log(json);
			var data = JSON.parse(json);
			var str = "";
			for(var i = 0;i<data.length;i++){
				console.log(data[i]['Код']);
				str +=getHTMLCategory(data[i]['Код'],data[i]['img'],data[i]['Наименование'],data[i]["Цена"]);
			}
			$('#content-page').html(str);
		}
	})

	$('#map_page').html(map_chapter);
	$('#name-chapter').html(chapter);
});


function searchRequest(request){

	//$("#logo").click();
	history.pushState(null, null, "?search=" + request);
	var str ="";
	if(request){
		$.ajax({
			type:"POST",
			url:"cms/search.php",
			data:{'data' : request},
			success: function(json){
				var data = JSON.parse(json);
				
				if(data.length != 0){
					for(var i = 0;i<data.length;i++){

						str +=getHTMLCategory(data[i]['Код'],data[i]['img'],data[i]['Наименование'],data[i]["Цена"]);
						//alert(str);
					}
					$('#content-page').html(getHTMLSearch(request) + str);
				}else{
					$('#content-page').html(getHTMLNullSearch(request));
				}

			}
		});

		$("#map_page").html("");
		$("#input_search").val("");
		$('#name-chapter').html("Поиск");
	}
	
}

$(document).on('click','#icon_search', function(){

		searchRequest($("#input_search").val());
});

function getHTMLNullSearch(str){
	var res = "<h2>Результаты поиска:</h2>\
				<p>Сожалеем, но по вашему запросу '" + str +"' ничего не найдено </p>";
	return res;
}
function getHTMLSearch(str){
	var res = "<h2>Результаты поиска: по запросу '" + str +  "'</h2>";
	return res;
}

function getHTMLTotalPrice(total,price){
	var str="<div>Количество товаров: <span>" + total + " шт.</span></div>\
			 <div id=\"b_total\">Итого: <span>" + price + "руб.</span></div>";
	return str;
}
function getHTMLBasketDefault(){
	var str ="<div class=\"b_default\">\
						<h2>Ваша корзина:</h2>\
						<div id=\"b_default_c\">\
							<p>Ваша корзина пуста.</p>\
						</div>\
						\
					</div>";
	return str;
}

function getHTMLProduct(t1,t2,t3,t4){
	var str ="<div id=\"product_c\">\
								<div id=\"photo_product\">\
									<img class=\"my-foto\" src=\"" + t1 + "\" />\
								</div>\
								<div class=\"info_product\">\
									<div class=\"font_info_product\">Артикул: <span>" + t2 + "</span></div>\
									<div class=\"font_info_product\">Производитель: <span>РФ</span></div>\
								</div>\
								<div id=\"info_price\">\
									<div id=\"price_bb\">\
										<div id=\"price_num\">" + t3 + "руб.</div>\
										<div id=\"product_balance\">" + getHTMLModalProduct(t4) + "</div>\
									</div>\
									<div id=\"total_number_input\">\
										<div id=\"p_minus\"></div>\
										<input id=\"meter\" value=\"1\" type=\"text\" disabled/>	\
										<div id=\"p_plus\"></div>\
									</div>\
									<div id=\"buy_basket\">\
										<div id=\"to_buy\"><p>Купить</p></div>\
										<div id=\"clear\"></div>\
									</div>\
								</div>\
							</div>\
							<a href=\"#modal_to_basket\" class=\"openModal\"><div id=\"start_modal\"></div></a>\
							<div id=\"more_info\">\
								<p><b>Внимание:</b> описание товара на сайте носит информационный\
									характер и может отличаться от описания, предоставленного в технической\
									документации производителя. Производитель оставляет за собой \
									право изменять конструкцию, технические характеристики, внешний вид, \
									комплектацию товара без предварительного уведомления продавца.\
								</p>\
								<p>\
									Убедительно просим Вас при покупке уточнять желаемые характеристики \
									(цвет, комлектацию и т.д.) у операторов интернет-магазина посредством e-mail,\
									по контактным телефонам или через поле \"Комментарий\" при оформлении заказа из \"Корзины\"\
								</p>\
							</div>"

	return str;
}
function getHTMLCategory(t1,t2,t3,t4){
	var res ="<div class='category'  title=\"" + t3 + "\"id='" + t1 + "'>\
							<div id='img_category' style=\"background-image:url('"+ t2 + "')\">\
								\
								<div id='name_category'  onselectstart=\"return false\" onmousedown=\"return false\">" + t3+ "</div>			\
							</div>\
							<div id='price' style='width:100%; cursor:pointer;'>" + t4 + " руб.</div>\
						</div>";

	return res;
}
function getHTMLModalProduct(t){
	var res ="";

	if(t > 0){
		res +="<div id=\"tick\"></div>\
					    <p style='padding-top:5%;'>есть в наличии " + t + " шт.</p>";
	}else{
		res +="<a href=\"#example\" class=\"openModal\"><div id=\"in_stock_product\"></div></a>\
								<p style='padding-top:5%;'>товара в наличии нет.</p>\
								<aside id=\"example\" class=\"modal\">\
									<div>\
										<h2>К сожалению товара нет на складе(((<br/>\
										    Вы можете сделать предзаказ.</h2>\
										<h3>Для этого требуется:</h3>\
										<p>1) Шаг 1: Связаться с нашим менеджером по телефону</p>\
										<p>2) Шаг 2: Сообщить артикул заказа</p>\
										<p>3) Шаг 3: Ждать информацию об доставке товара на складеещ_игещ</p>\
										<a href=\"#close\" title=\"Закрыть\">Закрыть</a>\
									</div>\
								</aside>";						
							
	}
	return res;
}

$(document).on('click', '.category', function(){


	var ID = $(this).attr('id');
	history.pushState(null, null, "?articule=" + ID);
	var map_chapter = "&raquo;<a id=\"a_category\">" + $('#name-chapter').html() + "</a>";

	$.ajax({
		url:"cms/getFA.php",
		type:"POST",
		data:{articules: ID},
		success:function(json){
			var data = JSON.parse(json);
			
			$('#content-page').html(getHTMLProduct(data[0]['img'], data[0]['Код'], data[0]['Цена'],data[0]['Наличие']));
			$('#map_page').append(map_chapter);
			$('#name-chapter').html(data[0]['Наименование']);
		}
	});

});



/*** btn_top**/

$(document).on('click',"#btn_up",function(){
	$('body,html').animate({scrollTop:0},800);
});
$(document).ready(function (){

	$(window).scroll(function(){
		if($(this).scrollTop() != 0 && $(this).scrollTop() != 1 && $(this).scrollTop() != 2){
			$('#btn_up').fadeIn();
		}else{
			$('#btn_up').fadeOut();
		}
	});

});

/**** Event #to_basket *****/

function getHTMLModalToBasket(name,articule,price,total){

	var res ="<aside id=\"modal_to_basket\" class=\"modal\">\
									<div>\
											<h2 align='left'>Вы положили в корзину товар:</h2>\
										<div class=\"b_product\">\
											<div class=\"b_info_prod\">\
												<div id=\"b_photo_prod\"></div>\
												<div class=\"b_more_info\">\
													<div id=\"b_name_prod\">" + name + "</div>\
													<div id=\"b_articul_prod\">Артикул: <span>" + articule + "</span></div>\
													<div id=\"b_articul_prod\">Количество: <span>" + total + "шт.</span></div>\
													<div id=\"b_articul_prod\">Цена: <span>" + price + "</span></div>\
												</div>\
											</div>\
										\
										</div>\
										<h2></h2>\
										<div id=\"modal_btn\">\
											<div id=\"m_red_btn\"><p>Продолжить покупки</p></div>\
											<div id=\"m_yellow_btn\"><p>Оформить заказ</p></div>	\
											<div id=\"clear\"></div>\
											<br/>\
										</div>\
										<a href=\"#close\" title=\"Закрыть\">Закрыть</a>\
									</div>\
								</aside>";

							
	return res;
}
$(document).on('click','#a_category', function(){


});
$(document).on('click', '#to_buy', function(){

	var request = $('.font_info_product span').html();
	var total = Number($('#meter').val());

	console.log(total);
	$.ajax({
		type:"POST",
		url:"cms/getFA.php",
		data:{'articules' : request },
		success:function(json){
			var data = JSON.parse(json);
			console.log(data[0]["Наличие"]);
			if(data[0]["Наличие"] > 0 && data[0]["Наличие"] != ""){

				localStorage.setItem(request, total);
				$("#total_tovar").html(localStorage.length);
				$('#start_modal').append(getHTMLModalToBasket(data[0]['Наименование'],data[0]['Код'],data[0]['Цена'],total));
				$("#start_modal").click();
			}else{
				$("#in_stock_product").click();
			}
		}

	});

});
$(document).ready(function (){
		$("#total_tovar").html(localStorage.length);
});



/****PLUS******/
function updatePrice(){
	var str = "";
	var price = 0;
	var total = 0;
	var request = "";
	for(var i = 0; i < localStorage.length;i++){

		request +=(i < localStorage.length - 1)? localStorage.key(i) +";" : localStorage.key(i);

	}

	$.ajax({
		type:"POST",
		url:"cms/getFA.php",
		data:{"articules" : request},
		success: function(json){
			var data = JSON.parse(json);
			for(var i = 0; i < data.length; i++){
				var temp =  Number(localStorage.getItem(data[i]["Код"]));
				price += Number(data[i]["Цена"]) * temp;
				total +=temp;
			}
			$('#b_total_price').html(getHTMLTotalPrice(total,price));
		}

	});

}
function getHTMLValue(total){
	var res="<div id=\"b_minus\"></div>\
			<input id=\"b_meter\" type=\"text\" value=\"" + total +"\" disabled/>\
			<div id=\"b_plus\"></div>";
	return res;
}

$(document).on('click',"#p_plus", function(){

	var request = $('.font_info_product span').html();

	var total = Number($('#meter').val());
	$.ajax({
		type:"POST",
		url:"cms/getFA.php",
		data:{'articules' : request },
		success:function(json){
			console.log(json);
			var data = JSON.parse(json);
			if(data[0]["Наличие"] > total){
				$('#meter').val(total+1);
			}else{
				$('#meter').val(total);
			}
		}

	});

});


$(document).on('click','#p_minus', function(){
	var total = Number($('#meter').val());
	total = (total != 1)? total-1: total;
	$('#meter').val(total);

});

$(document).on('click','#b_minus', function(){
	var request = $(this).parent().parent().parent().attr('id');
	var total = Number(localStorage.getItem(request));
	var str = "#" + request + " ";
	total = (total != 1)? total-1: total;
	$(str + '#b_umnog span').html(total)
	$(str + "#total_number_input").html(getHTMLValue(total));
	localStorage.setItem(request, total);
	updatePrice();

});
$(document).on('click',"#b_plus", function(){

	var request = $(this).parent().parent().parent().attr('id');
	var total = Number(localStorage.getItem(request));
	var str = "#" + request + " ";

	$.ajax({
		type:"POST",
		url:"cms/getFA.php",
		data:{"articules" : request},
		success:function(json){
			var data = JSON.parse(json);

			if(data[0]["Наличие"] > total){
				$(str + '#b_umnog span').html(total+1);
				$(str + "#total_number_input").html(getHTMLValue(total+1));
				localStorage.setItem(request, total+1);
				updatePrice();

			}

		}


	});

});

/**Оформить заказ**/
$(document).on('click',"#m_yellow_btn", function(){

	$('#basket').click();

});
$(document).on('click',"#m_red_btn", function(){

	$('#modal_to_basket').remove();

});
/*****DOCUMENT IS READY?*******/
/*******Event for btn Enter********/

$(document).ready(function(){


	$('html').keydown(function(eventObject){
	  if (event.keyCode == 13) {
	  		if($("#input_search").val() != ""){
	  			searchRequest($("#input_search").val());
	  		}  
	  }
	});

});

/***Clicl Catalog*******/

function getHTMLCatalog(){
	var res ="<div id=\"с_content\">\
				<div id=\"map_page\">\
					<a href=\"index.html\">Главная</a>\
					&raquo;\
				</div>\
				<div id=\"name-chapter\">Каталог</div>\
				<div id=\"content-page\">\
				</div>\
			</div>";
	return res;
}
$(document).on('click',"#click_catalog", function(){
	$('#container').html(getHTMLCatalog());
	var str="";
		$.ajax({
		url:"cms/getTables.php",
		success:function(json){
			var data = JSON.parse(json); 
			var str = "";
			for(var i = 0;i<data.length;i++){
				str += "<div>" + data[i]["Tables_in_u111116986_trk"] + "</div>";			
			}

			$('#content-page').html(str);
		}		
	});
});