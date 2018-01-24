$(document).ready(function() {
    loadProduct();
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function loadProduct(){
	var id = getParameterByName('id');
	$.ajax({
		url: "http://localhost:3000/_api/v1/products/"+id,
		type: 'GET',				
		success: function(response){
			console.log(response);
			var content = '';
			content += '<div class="col-sm-5">';
			content +=		'<div class="view-product">';
			content +=			'<img src="'+response.Picture1+'" alt="">';
			content +=		'</div>';
			content +=		'<div id="similar-product" class="carousel slide" data-ride="carousel">';
			content +=		   '<div class="carousel">';
			content +=				'<div class="text-center">';
			content +=					'<a href=""><img src="'+response.Picture1+'" alt=""></a>';
			content +=					'<a href=""><img src="'+response.Picture2+'" alt=""></a>';
			content +=				'</div>';
			content +=			'</div>';
			content +=		    '<a class="left item-control" href="#similar-product" data-slide="prev">';
			content +=				'<i class="fa fa-angle-left"></i>';
			content +=		    '</a>';
			content +=		    '<a class="right item-control" href="#similar-product" data-slide="next">';
			content +=				'<i class="fa fa-angle-right"></i>';
			content +=		    '</a>';
			content +=		'</div>';
			content +=	'</div>';
			content +=	'<div class="col-sm-7">';
			content +=		'<div class="product-information">';
			content +=			'<h1>'+response.ProductName+'</h1>';
			content +=			'<span>';
			content +=				'<span>'+response.Price+' VND</span>';
			content +=			'</span>';
			content +=			'<p><label>Số Lượng:</label>';
			content +=			'<input type="text" value="1" style="width:60px;">';
			content +=			'<button type="button" class="btn btn-fefault cart">';
			content +=				'<i class="fa fa-shopping-cart"></i>';
			content +=				' Cho vào giỏ';
			content +=			'</button></p>';
			content +=			'<p><b>Trạng Thái:</b> '+response.Availability+'</p>';
			content +=			'<p><b>Loại Kính:</b> '+response.ProductType+'</p>';
			content +=			'<p><b>Hãng:</b> '+response.Brand+'</p>';
    		content +=			'<p><b>Kích Thước:</b> '+response.Size+'</p>';
			content +=			'<p><b>Màu Sắc:</b> '+response.Color+'</p>';
    		content +=			'<p><b>Mô Tả:</b> '+response.Discribe+'</p>';
			content +=		'</div>';
			content +=	'</div>';
   			$('#product_details').html(content);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});

	$.ajax({
		url: "http://localhost:3000/_api/v1/products?page=1&limit=6",
		type: 'GET',				
		success: function(response){
			var contentItem1 = '';
			var contentItem2 = '';
			var product = response.listProduct;
			for (var i = 0; i < 3; i++) {
				contentItem1 +=	'<div class="col-sm-4">';
				contentItem1 +=		'<div class="product-image-wrapper">';
				contentItem1 +=			'<div class="single-products">';
				contentItem1 +=					'<div class="productinfo text-center">';
				contentItem1 +=						'<a href="product-details.html?id='+product[i]._id+'"><img src="'+product[i].Picture1+'" alt=""></a>';
				contentItem1 +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				contentItem1 +=						'<a href="product-details.html?id='+product[i]._id+'"><p>'+product[i].ProductName+'</p></a>';
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
				contentItem2 +=						'<a href="product-details.html?id='+product[i]._id+'"><img src="'+product[i].Picture1+'" alt=""></a>';
				contentItem2 +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				contentItem2 +=						'<a href="product-details.html?id='+product[i]._id+'"><p>'+product[i].ProductName+'</p></a>';
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