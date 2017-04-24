/*	Javascript code for all elements
/*----------------------------------------------------*/

$(document).ready(function() {
    count(".coming-soon");           
});


/* -------- Owl Carousel MTCH -------- */
$(".quote-carousel").owlCarousel({
	slideSpeed : 300,
	autoPlay : true,
	paginationSpeed : 400,
	singleItem : true,		
});
// End Owl Carousel


/* -------- Counter Up -------- */
$('.counter').counterUp({
	delay: 10,
	time: 1000
});
// End Counter Up


/*	Count Down
/*---------------------------------------------------- MTCH*/
function count(elem){
    var $e = $(elem);
	if($e.length==0){
		return 0;
	};

	//CountDown
    var dateOfBeginning = new Date(),
        dateOfEnd = $e.closest('[data-end-date]').attr('data-end-date') || new Date((new Date()).getTime() + 3*30*24*3600*1000);

    countDown(dateOfBeginning, dateOfEnd); 

}


/* -------- Isotope Filtering -------- */
var $container = $('.isotope-gallery-container');
var $filter = $('.filter');
$(window).load(function () {
    // Initialize Isotope
    $container.isotope({
        itemSelector: '.gallery-item-wrapper'
    });
    $('.filter a').click(function () {
        var selector = $(this).attr('data-filter');
        var $iso_container = $(this).closest('.content-block,body').find('.isotope-gallery-container');
        $iso_container.isotope({ filter: selector });

        var $iso_filter = $(this).closest('.filter');
        $iso_filter.find('a').parent().removeClass('active');
        $(this).parent().addClass('active');
        return false;
    });
  /*  $filter.find('a').click(function () {
        var selector = $(this).attr('data-filter');
        $filter.find('a').parent().removeClass('active');
        $(this).parent().addClass('active');
    });*/
});
$(window).smartresize(function () {
    $container.isotope('reLayout');
});
// End Isotope Filtering


/* -------- Gallery Popup -------- */
$(document).ready(function(){
	$('.gallery-zoom').magnificPopup({ 
		type: 'image'
		// other options
	});
});
// End Gallery Popup


/* -------- Google Map -------- MTCH */
var map;
var infowindow;
function initMap(elem,longitude,latitude) {


    var lat = parseFloat(latitude || 41.306523899999995);
    var long = parseFloat(longitude ||  -96.1633042);
    var zoom = 15;

    var marker_image = 'images/map-pin.png';

	//Map start init
    var mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        scaleControl: true,
        scrollwheel: true,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{stylers:[{saturation:-100},{gamma:1}]},{elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:50},{gamma:0},{hue:"#50a5d1"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{color:"#333333"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{weight:0.5},{color:"#333333"}]},{featureType:"transit.station",elementType:"labels.icon",stylers:[{gamma:1},{saturation:50}]}]
    }
                    
    map = new google.maps.Map(elem[0], mapOptions);

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: new google.maps.LatLng(lat, long),
        radius: '5000',
        type:'point_of_interest'
    }, showMarkers);

    var marker = new google.maps.Marker({
    	icon: marker_image,
        map: map,
        position: map.getCenter()
    });
}

function showMarkers(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var serviceInner = new google.maps.places.PlacesService(map);
            serviceInner.getDetails({
                    placeId: place.place_id
                },createMarker);
        }
    }
}

function createMarker(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        var marker = new google.maps.Marker({
            map: map,
            icon: 'images/map-pin.png',
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name + '<br>' + place.formatted_address);
            infowindow.open(map, this);
        });
    }
}

//end Google Map



/* -------- Header 1 Nav -------- */
$(".headroom").headroom({
});

/* Soft scroll */
$(function() {
    $('.soft-scroll a[href^="#"], a[href^="#"].soft-scroll').bind('click', function(event) {
        var $anchor = $(this);
        var href = $anchor.attr('href');
        try {
            var elem = $(href);
            if(elem.length) {
                $('html, body').stop().animate({
                    scrollTop: elem.offset().top
                }, 1000);

                event.preventDefault();
            }
        }
        catch(err) {}
    });
});

    
/* -------- Header 3 Nav -------- MTCH */

function initHeader3() {
    $('.nav-slide-btn').click(function() {
        $('.pull').slideToggle();
    });

    $('#nav-toggle').click(function(e) {
        $(this).toggleClass('active');
        e.preventDefault();
    })
}
$(function() {
    initHeader3();
});

