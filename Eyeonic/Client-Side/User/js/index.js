var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products/";

$(document).ready(function() {
    loadProduct();
});

function loadProduct(){
	$.ajax({
		url: "http://localhost:3000/_api/v1/products?page=1&limit=9",
		type: 'GET',				
		success: function(response){
			var content = '';
			var contentItem1 = '';
			var contentItem2 = '';
			var product = response.listProduct;
			for (var i = 0; i < product.length; i++) {
				content +=	'<div class="col-sm-4">';
				content +=		'<div class="product-image-wrapper">';
				content +=			'<div class="single-products">';
				content +=					'<div class="productinfo text-center">';
				content +=						'<img src="'+product[i].Picture1+'" alt="">';
				content +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				content +=						'<p>'+product[i].ProductName+'</p>';
				content +=						'<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				content +=					'</div>';
				content +=			'</div>';
				content +=			'<div class="choose">';
				content +=				'<ul class="nav nav-pills nav-justified">';
				content +=					'<li><a href="#"><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				content +=				'</ul>';
				content +=			'</div>';
				content +=		'</div>';
				content +=	'</div>';
			};
   			$('#features_items').html(content);

   			for (var i = 0; i < 3; i++) {
				contentItem1 +=	'<div class="col-sm-4">';
				contentItem1 +=		'<div class="product-image-wrapper">';
				contentItem1 +=			'<div class="single-products">';
				contentItem1 +=					'<div class="productinfo text-center">';
				contentItem1 +=						'<img src="'+product[i].Picture1+'" alt="">';
				contentItem1 +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				contentItem1 +=						'<p>'+product[i].ProductName+'</p>';
				contentItem1 +=						'<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				contentItem1 +=					'</div>';
				contentItem1 +=			'</div>';
				contentItem1 +=			'<div class="choose">';
				contentItem1 +=				'<ul class="nav nav-pills nav-justified">';
				contentItem1 +=					'<li><a href="#"><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				contentItem1 +=				'</ul>';
				contentItem1 +=			'</div>';
				contentItem1 +=		'</div>';
				contentItem1 +=	'</div>';
			};
			$('.col-sm-9 .carousel-inner .item:first-child').html(contentItem1);

			for (var i = 3; i < 6; i++) {
				contentItem2 +=	'<div class="col-sm-4">';
				contentItem2 +=		'<div class="product-image-wrapper">';
				contentItem2 +=			'<div class="single-products">';
				contentItem2 +=					'<div class="productinfo text-center">';
				contentItem2 +=						'<img src="'+product[i].Picture1+'" alt="">';
				contentItem2 +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				contentItem2 +=						'<p>'+product[i].ProductName+'</p>';
				contentItem2 +=						'<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				contentItem2 +=					'</div>';
				contentItem2 +=			'</div>';
				contentItem2 +=			'<div class="choose">';
				contentItem2 +=				'<ul class="nav nav-pills nav-justified">';
				contentItem2 +=					'<li><a href="#"><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				contentItem2 +=				'</ul>';
				contentItem2 +=			'</div>';
				contentItem2 +=		'</div>';
				contentItem2 +=	'</div>';
			};
			$('.col-sm-9 .carousel-inner .item:last-child').html(contentItem2);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}