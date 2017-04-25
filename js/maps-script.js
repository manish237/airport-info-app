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
