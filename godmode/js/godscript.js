$(document).ready(function(){
	Refresh();
	var interval = setInterval(Refresh, 10000);
});
function Refresh(){
	$.ajax({
		url:"getProduction.php",
		type:"POST",
		success:function(json){
			var data = JSON.parse(json);
			var str = "";
			for(var i = 0;i<data.length;i++){
				str += '<div class="order" data-number="'+ data[i]['number'] +'"" data-fio="' +data[i]['fio']+'" data-phone="'+ data[i]['phone'] + '" data-email="'+ data[i]['email'] +'" data-id="2">'+ data[i]['id'] + ' ' + data[i]['fio'] +'</div>';
			}
			$(".orders").html(str);
		}
	});
	$.ajax({
		url:"getReservation.php",
		type:"POST",
		success:function(json){
			var data = JSON.parse(json);
			var str = "";
			$.ajax({
				url:"statusR.php",
				success:function(json1){
					var data1 = JSON.parse(json1);
						for(var i = 0;i<data.length;i++){
							str += '<div class="reservation" ';
							for(var j = 0;j<data1.length;j++){
								if(data1[j]['number'] == data[i]["number"]) str += 'style="background-color:#f00" ';
							}
							str += 'data-number="'+ data[i]['number'] +'"" data-fio="' +data[i]['fio']+'" data-phone="'+ data[i]['phone'] + '" data-email="'+ data[i]['email'] +'" data-id="2">'+ data[i]['id'] + ' ' + data[i]['fio'] +'</div>';
						}	
						
			$(".reservations").html(str);
				}
			});
		}
	});
}
$(document).on('click', '.order', function(){
	var dataAboutOrder;
	var articule = "";
	var data;
						var strMoreInfo = '<div class="fio">' + $(this).data("fio") + '</div><div class="phone">' + $(this).data("phone") + '</div><div class="email">' + $(this).data("email") + '</div><div class="listProducts">ПЕРЕЧЕНЬ ТОВАРОВ</div>';
						
	$.ajax({
		url:"getOrder.php",
		type:"POST",
		data:{num:$(this).data("number")},
		success:function(jsonData){
			dataAboutOrder = JSON.parse(jsonData);
			for(var i = 0;i<dataAboutOrder.length;i++)articule += dataAboutOrder[i]['Код'] + (i + 1 == dataAboutOrder.length ? "" : ";");

			$.ajax({
				url:"getFA.php",
				type:"POST",
				data:{articules:articule},
				success:function(jsonData1){
					data = JSON.parse(jsonData1);
						console.log(strMoreInfo);
						var HTMLLC = strMoreInfo + getProducts(data, dataAboutOrder);
						$(".more_info").html(HTMLLC);
				}
			});
		}
	});
});
$(document).on('click', '.reservation', function(){
	var dataAboutOrder;
	var articule = "";
	var data;
						var strMoreInfo = '<div class="fio">' + $(this).data("fio") + '</div><div class="phone">' + $(this).data("phone") + '</div><div class="email">' + $(this).data("email") + '</div><div class="listProducts">ПЕРЕЧЕНЬ ТОВАРОВ</div>';
						
	$.ajax({
		url:"getReservs.php",
		type:"POST",
		data:{num:$(this).data("number")},
		success:function(jsonData){
			dataAboutOrder = JSON.parse(jsonData);
			for(var i = 0;i<dataAboutOrder.length;i++)articule += dataAboutOrder[i]['Код'] + (i + 1 == dataAboutOrder.length ? "" : ";");

			$.ajax({
				url:"getFA.php",
				type:"POST",
				data:{articules:articule},
				success:function(jsonData1){
					data = JSON.parse(jsonData1);
						console.log(strMoreInfo);
						var HTMLLC = strMoreInfo + getProducts(data, dataAboutOrder);
						$(".more_info").html(HTMLLC);
				}
			});
		}
	});
});
function getProducts(aData, oData){
	for(var i =0;i<aData.length;i++){
		if(aData[i]["Код"] != oData[i]["Код"]){
			for(var j = 0;j<oData.length;j++){
				if(aData[i]["Код"] == oData[j]["Код"]){
					var temp = oData[j];
					oData[j] = oData[i];
					oData[i] = temp;
					break;
				}
			}
		}
	}
	var str = '<div class="products">';
	for(var i = 0;i<aData.length;i++){
		str += '<div class="product">\
					<div class="infoBox">\
						<div class="name">Наименование: ' + aData[i]["Наименование"];str += '</div>\
						<div class="article">Артикул: ' + aData[i]["Код"];str += '</div>\
						<div class="price">Цена за шт.: ' + aData[i]["Цена"];str += ' руб.</div>\
						<div class="count">Количество: ' + oData[i]["count"];str += ' шт.</div>\
						<div class="totalPrice">Общая цена: ' + aData[i]["Цена"]*oData[i]["count"];str += ' руб.</div>\
					</div>\
					<div class="imageBox"><img src="' + aData[i]["img"];str += '"></div>\
				</div>';
	}
	str += '</div>';
	return str;
}